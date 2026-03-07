import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Role = "admin" | "user" | null;

interface AuthContextType {
  user: string | null;
  role: Role;
  isAuthenticated: boolean;
  login: (email: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    const savedRole = localStorage.getItem("auth_role") as Role;

    if (savedUser && savedRole) {
      setUser(savedUser);
      setRole(savedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, role: Role) => {
    setUser(email);
    setRole(role);
    setIsAuthenticated(true);
    localStorage.setItem("auth_user", email);
    localStorage.setItem("auth_role", role as string);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_role");
  };

  return (
    <AuthContext.Provider
      value={{ user, role, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
