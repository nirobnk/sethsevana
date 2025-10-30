import React from "react";
import { Outlet } from "react-router-dom";
import { useSidebar, Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AppLayout = ({
  title = "Admin portal",
  subtitle = "Here's what's happening at your clinic today",
  onLogout,
  user,
}) => {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={title} subtitle={subtitle} user={user} />

      <div className="flex">
        <Sidebar onLogout={onLogout} />

        <main
          className={`
            flex-1 transition-all duration-300
            ${isOpen ? "lg:ml-64" : "lg:ml-20"}
            mt-16 px-4 pb-10 sm:px-6
          `}
        >
          <div className="mx-auto max-w-6xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
