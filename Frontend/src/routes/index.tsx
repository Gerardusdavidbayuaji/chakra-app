import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";
import { AuthProvider } from "@/utils/context/AuthContext";

import InstallmentsPage from "@/pages/installments";
import PremiumPlanPage from "@/pages/premium-plan";
import CustomersPage from "@/pages/customers";
import ReportsPage from "@/pages/reports";
import NotFound from "@/pages/not-found";
import AdminPage from "@/pages/admin";
import AuthPage from "@/pages/auth";
import HomePage from "@/pages";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute allowedRoles={["user"]}>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/installments",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <InstallmentsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/premium-plan",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <PremiumPlanPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/premium-plan/:planId",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <CustomersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reports",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <ReportsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
