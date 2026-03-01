import type { INavigationItem } from ".";
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  FileText,
  Users,
} from "lucide-react";

export const navigationItems: INavigationItem[] = [
  {
    icon: <LayoutDashboard className="w-4 h-4" />,
    label: "Dashboard",
    href: "#",
  },
  {
    icon: <CreditCard className="w-4 h-4" />,
    label: "Premium Plan",
    href: "#",
  },
  { icon: <Users className="w-4 h-4" />, label: "Customers", href: "#" },
  { icon: <FileText className="w-4 h-4" />, label: "Installments", href: "#" },
  { icon: <BarChart3 className="w-4 h-4" />, label: "Reports", href: "#" },
];
