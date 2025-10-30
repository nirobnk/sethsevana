import React from "react";
import { useSidebar } from "./SidebarContext";

export default function SidebarSection({ title, children }) {
  const { isOpen } = useSidebar();

  return (
    <div className="mb-6">
      {title && (
        <h3
          className={`
            px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider
            ${isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"}
            transition-opacity duration-200
          `}
        >
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}