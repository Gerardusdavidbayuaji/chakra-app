import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/utils/context/AuthContext";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async () => {
    setError("");
    setIsLoading(true);

    const { error } = isLogin
      ? await login(email, password)
      : await signup(email, password);

    setIsLoading(false);

    if (error) {
      setError(error);
      return;
    }

    if (isLogin) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isLogin ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Enter your details below to get started"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <div className="p-2 text-xs font-medium text-red-500 bg-red-50 rounded border border-red-100">
              {error}
            </div>
          )}
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Button
            onClick={handleAuth}
            disabled={isLoading}
            className="w-full h-10 mt-2 font-semibold tracking-wide"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
          <Link
            to="/"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
