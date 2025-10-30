import { NavLink } from "react-router-dom";
import { useSidebar } from "./SidebarContext";

export default function SidebarItem({ icon, label, to, badge }) {
  const { isOpen, closeMobile } = useSidebar();
  const IconComponent = icon;

  return (
    <NavLink
      to={to}
      onClick={closeMobile}
      className={({ isActive }) =>
        `
        w-full flex items-center gap-3 px-4 py-3 rounded-lg
        transition-all duration-200 group relative
        ${
          isActive
            ? "bg-teal-600 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }
      `
      }
    >
      {({ isActive }) => (
        <>
          <IconComponent
            className={`w-5 h-5 flex-shrink-0 ${
              isActive ? "text-white" : "text-gray-600"
            }`}
          />
          <span
            className={`
              font-medium text-sm whitespace-nowrap
              ${isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"}
              transition-opacity duration-200
            `}
          >
            {label}
          </span>

          {badge && (
            <span
              className={`
                ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full
                ${isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"}
              `}
            >
              {badge}
            </span>
          )}

          {!isOpen && (
            <div
              className="
                hidden lg:block absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white 
                text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100
                pointer-events-none transition-opacity duration-200 z-50
              "
            >
              {label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}