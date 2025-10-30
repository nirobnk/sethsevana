



// import React from "react";
// import { useSidebar,Sidebar} from './Sidebar/index'

// import { Header } from "./Header";

// export const AppLayout = ({ 
//   children, 
//   title = "Welcome to Seth Sevana Admin Portal",
//   subtitle = "Here's what's happening at your clinic today",
//   activeRoute = "/dashboard",
//   onNavigate,
//   onLogout,
//   user
// }) => {
//   const { isOpen } = useSidebar();

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Fixed Header - Always on top */}
//       <Header 
//         title={title} 
//         subtitle={subtitle} 
//         user={user}
//       />

//       {/* Main Layout Container */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar - Fixed height, scrollable content */}
//         <Sidebar
//           activeRoute={activeRoute}
//           onNavigate={onNavigate}
//           onLogout={onLogout}
//         />

//         {/* Main Content Area - Scrollable */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };



// import React from "react";
// import { useSidebar, Sidebar } from "./Sidebar/index";
// import { Header } from "./Header";

// export const AppLayout = ({
//   children,
//   title = "Welcome to Seth Sevana Admin Portal",
//   subtitle = "Here's what's happening at your clinic today",
//   activeRoute = "/dashboard",
//   onNavigate,
//   onLogout,
//   user,
// }) => {
//   const { isOpen } = useSidebar();

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header always on top */}
//       <Header title={title} subtitle={subtitle} user={user} />

//       {/* Layout below header */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar (fixed position but only visible below header) */}
//         <div
//           className={`
//             hidden lg:block 
//             ${isOpen ? "w-64" : "w-20"}
//             bg-white border-r border-gray-200
//             fixed top-[73px] bottom-0 z-40
//           `}
//         >
//           <Sidebar
//             activeRoute={activeRoute}
//             onNavigate={onNavigate}
//             onLogout={onLogout}
//           />
//         </div>

//         {/* Main content area (scrollable) */}
//         <main
//           className={`
//             flex-1 overflow-y-auto transition-all duration-300
//             ${isOpen ? "lg:ml-64" : "lg:ml-20"}
//           `}
//         >
//           <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { useSidebar, Sidebar } from "./Sidebar/index";
import { Header } from "./Header";

export const AppLayout = ({
  children,
  title = "Welcome to Seth Sevana Admin Portal",
  subtitle = "Here's what's happening at your clinic today",
  activeRoute = "/dashboard",
  onNavigate,
  onLogout,
  user,
}) => {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <Header title={title} subtitle={subtitle} user={user} />

      {/* Layout below header */}
      <div className="flex flex-1 overflow-hidden pt-[73px]">
        {/* Sidebar */}
        <Sidebar
          activeRoute={activeRoute}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <main
          className={`
            flex-1 overflow-y-auto transition-all duration-300
            ${isOpen ? "lg:ml-64" : "lg:ml-20"}
          `}
        >
          <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};