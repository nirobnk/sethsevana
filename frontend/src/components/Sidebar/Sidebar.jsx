import React from "react";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  CalendarCheck,
  Settings,
  LogOut,
  User,
  Menu,
  ChevronLeft,
  Bell,
} from "lucide-react";
import { useSidebar, SidebarSection, SidebarItem } from "./index";

export const Sidebar = ({ logo = "S", onLogout }) => {
  const { isOpen, isMobileOpen, toggle, closeMobile } = useSidebar();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
    { icon: User, label: "Profile", to: "/profile" },
    { icon: Bell, label: "Notifications", to: "/notifications", badge: "3" },
    { icon: Users, label: "Manage Users", to: "/patients" },
    { icon: UserCog, label: "Manage Doctors", to: "/doctors" },
    {
      icon: Calendar,
      label: "All Appointments",
      to: "/appointments",
      badge: "8",
    },
    { icon: CalendarCheck, label: "Book Appointment", to: "/book" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-black/50 lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-40 flex flex-col
          border-r border-gray-200 bg-white shadow-sm
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${isOpen ? "w-64" : "w-64"}
          lg:translate-x-0
          ${isOpen ? "lg:w-64" : "lg:w-20"}
        `}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div
            className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white font-semibold">
              {logo}
            </div>
            <span className="text-lg font-semibold text-gray-900">
              Seth Sevana
            </span>
          </div>

          <button
            type="button"
            onClick={toggle}
            className="hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:flex"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={closeMobile}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-6">
          <SidebarSection>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                badge={item.badge}
              />
            ))}
          </SidebarSection>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <button
            type="button"
            onClick={() => onLogout?.()}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span
              className={`text-sm font-medium transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
