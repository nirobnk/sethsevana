


import React from "react";
import { Menu, Bell, Settings } from "lucide-react";
import { useSidebar } from "./Sidebar/index";

export const Header = ({ title, subtitle, user }) => {
  const { toggleMobile } = useSidebar();

  return (
    <header className="bg-gradient-to-r from-teal-700 to-emerald-500 text-white fixed left-0 right-0 top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobile}
            className="lg:hidden p-2 hover:bg-white/15 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          {/* Title Section */}
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-emerald-100 mt-1 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* System Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/20 text-white rounded-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">System Online</span>
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 hover:bg-white/15 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
          </button>

          {/* Settings */}
          <button
            className="hidden sm:block p-2 hover:bg-white/15 rounded-lg transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-6 h-6 text-white" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 sm:pl-4 border-l border-white/30">
            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-emerald-700 font-semibold text-sm">
              {user?.name?.charAt(0) || "A"}
            </div>
            <span className="font-medium text-white hidden sm:block text-sm">
              {user?.name || "Admin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};