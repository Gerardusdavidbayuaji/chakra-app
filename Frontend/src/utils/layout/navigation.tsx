import type { INavigationItem } from ".";
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  FileText,
  Users,
  Home,
} from "lucide-react";

export const navigationItems: INavigationItem[] = [
  { icon: <Home className="w-4 h-4" />, label: "Home", href: "/" },
  {
    icon: <LayoutDashboard className="w-4 h-4" />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <CreditCard className="w-4 h-4" />,
    label: "Premium Plan",
    href: "/premium-plan",
  },
  {
    icon: <Users className="w-4 h-4" />,
    label: "Customers",
    href: "/customers",
  },
  {
    icon: <FileText className="w-4 h-4" />,
    label: "Installments",
    href: "/installments",
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    label: "Reports",
    href: "/reports",
  },
];
