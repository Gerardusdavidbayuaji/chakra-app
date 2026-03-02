import { createBrowserRouter, RouterProvider } from "react-router-dom";

import InstallmentsPage from "@/pages/installments";
import PremiumPlanPage from "@/pages/premium-plan";
import CustomersPage from "@/pages/customers";
import DashboardPage from "@/pages/dashboard";
import ReportsPage from "@/pages/reports";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/installments",
      element: <InstallmentsPage />,
    },
    {
      path: "/premium-plan",
      element: <PremiumPlanPage />,
    },
    {
      path: "/premium-plan/:planId",
      element: <CustomersPage />,
    },
    {
      path: "/reports",
      element: <ReportsPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}
