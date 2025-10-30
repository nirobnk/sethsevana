



// import React from "react";
// import { useSidebar,SidebarSection,SidebarItem } from "./index";
// import {
//   LayoutDashboard, Users, UserCog, Calendar,
//   CalendarCheck, CreditCard, Settings,
//   LogOut, User, Menu, ChevronLeft
// } from "lucide-react";



// export const Sidebar = ({ logo, activeRoute = "/dashboard", onNavigate, onLogout }) => {
//   const { isOpen, isMobileOpen, toggle, closeMobile } = useSidebar();

//   const menuItems = [
//     { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
//     { icon: User, label: "Profile", to: "/profile" },
//     { icon: Users, label: "Manage Users", to: "/users" },
//     { icon: UserCog, label: "Manage Doctors", to: "/doctors" },
//     { icon: Calendar, label: "All Appointments", to: "/appointments", badge: "8" },
//     { icon: CalendarCheck, label: "Book Appointment", to: "/book" },
//     { icon: CreditCard, label: "Payments", to: "/payments" },
//     { icon: Settings, label: "Settings", to: "/settings" },
//   ];

//   return (
//     <>
//       {/* Mobile Overlay - Only shows on mobile when sidebar is open */}
//       {isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={closeMobile}
//           aria-hidden="true"
//         />
//       )}

//       {/* Sidebar Container */}
//       <aside
//         className={`
//           bg-white border-r border-gray-200
//           transition-all duration-300 ease-in-out
//           flex flex-col
          
//           /* Mobile: Fixed overlay sidebar */
//           fixed top-0 left-0 bottom-0 z-50
//           ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
//           ${isOpen ? "w-64" : "w-64"}
          
//           /* Desktop: Static in layout flow */
//           lg:static lg:translate-x-0 lg:z-auto
//           ${isOpen ? "lg:w-64" : "lg:w-20"}
//         `}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200 min-h-[73px]">
//           {/* Logo and Title */}
//           <div
//             className={`
//               flex items-center gap-3 transition-opacity duration-300
//               ${isOpen ? "opacity-100" : "lg:opacity-0 lg:w-0 lg:overflow-hidden"}
//             `}
//           >
//             <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
//               {logo || "S"}
//             </div>
//             <span className="font-bold text-lg whitespace-nowrap">
//               Seth Sevana
//             </span>
//           </div>

//           {/* Desktop Toggle Button */}
//           <button
//             onClick={toggle}
//             className="hidden lg:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
//             aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
//           >
//             {isOpen ? (
//               <ChevronLeft className="w-5 h-5 text-gray-600" />
//             ) : (
//               <Menu className="w-5 h-5 text-gray-600" />
//             )}
//           </button>

//           {/* Mobile Close Button */}
//           <button
//             onClick={closeMobile}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             aria-label="Close menu"
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//           <SidebarSection>
//             {menuItems.map((item) => (
//               <SidebarItem
//                 key={item.to}
//                 icon={item.icon}
//                 label={item.label}
//                 to={item.to}
//                 badge={item.badge}
//                 active={activeRoute === item.to}
//                 onClick={() => {
//                   onNavigate?.(item.to);
//                   closeMobile();
//                 }}
//               />
//             ))}
//           </SidebarSection>
//         </nav>

//         {/* Footer - Logout Button */}
//         <div className="border-t border-gray-200 p-4">
//           <button
//             onClick={() => {
//               onLogout?.();
//               closeMobile();
//             }}
//             className="
//               w-full flex items-center gap-3 px-4 py-3 rounded-lg
//               text-red-600 hover:bg-red-50 transition-colors
//               group
//             "
//           >
//             <LogOut className="w-5 h-5 flex-shrink-0" />
//             <span
//               className={`
//                 font-medium text-sm transition-opacity duration-300
//                 ${isOpen ? "opacity-100" : "lg:opacity-0 lg:w-0 lg:overflow-hidden"}
//               `}
//             >
//               Logout
//             </span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };




import React from "react";
import {
  LayoutDashboard, Users, UserCog, Calendar, CalendarCheck,
  CreditCard, Settings, LogOut, User, Menu, ChevronLeft
} from "lucide-react";
import { useSidebar, SidebarSection, SidebarItem } from "./index";

export const Sidebar = ({ logo, activeRoute = "/dashboard", onNavigate, onLogout }) => {
  const { isOpen, isMobileOpen, toggle, closeMobile } = useSidebar();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
    { icon: User, label: "Profile", to: "/profile" },
    { icon: Users, label: "Manage Users", to: "/patients" },
    { icon: UserCog, label: "Manage Doctors", to: "/doctors" },
    { icon: Calendar, label: "All Appointments", to: "/appointments", badge: "8" },
    { icon: CalendarCheck, label: "Book Appointment", to: "/book" },
    { icon: CreditCard, label: "Payments", to: "/payments" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`
          fixed top-[73px] left-0 bottom-0 z-40 bg-white border-r border-gray-200
          flex flex-col transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${isOpen ? "w-64" : "w-20"}
          lg:translate-x-0
        `}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
              {logo || "S"}
            </div>
            <span className="font-bold text-lg whitespace-nowrap">Seth Sevana</span>
          </div>

          <button
            onClick={toggle}
            className="hidden lg:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <SidebarSection>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                badge={item.badge}
                active={activeRoute === item.to}
                onClick={() => {
                  onNavigate?.(item.to);
                  closeMobile();
                }}
              />
            ))}
          </SidebarSection>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 transition-all duration-300">
          <button
            onClick={() => {
              onLogout?.();
              closeMobile();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className={`${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};