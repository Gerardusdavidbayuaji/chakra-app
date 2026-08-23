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
        <ProtectedRoute>
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
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/installments",
      element: (
        <ProtectedRoute>
          <InstallmentsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/premium-plan",
      element: (
        <ProtectedRoute>
          <PremiumPlanPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/premium-plan/:planId",
      element: (
        <ProtectedRoute>
          <CustomersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reports",
      element: (
        <ProtectedRoute>
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
