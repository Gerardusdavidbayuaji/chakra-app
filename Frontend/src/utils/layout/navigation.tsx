import type { INavigationItem } from ".";
import { LayoutDashboard, CreditCard, Home } from "lucide-react";

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
];
