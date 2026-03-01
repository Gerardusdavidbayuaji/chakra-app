import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { navigationItems } from "@/utils/layout/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/utils/utils";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-2.5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">fp</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-gray-900">FinPay</span>
            <span className="text-xs text-gray-500">OS</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-xs transition-all",
                  location.pathname === item.href
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center cursor-pointer gap-3 w-full px-4 py-3 text-red-500 font-medium text-xs hover:bg-red-50 rounded-lg transition-all">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
