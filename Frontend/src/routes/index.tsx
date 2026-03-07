import { createBrowserRouter, RouterProvider } from "react-router-dom";

import InstallmentsPage from "@/pages/installments";
import PremiumPlanPage from "@/pages/premium-plan";
import CustomersPage from "@/pages/customers";
import ReportsPage from "@/pages/reports";
import NotFound from "@/pages/not-found";
import AdminPage from "@/pages/admin";
import HomePage from "@/pages";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/dashboard",
      element: <AdminPage />,
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
