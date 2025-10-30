import { SidebarProvider } from "./components/Sidebar";
import { AppLayout } from "./components/AppLayout";
import { AllRoutes } from "./routes/AllRoutes";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {pathname === "/" || pathname === "/register" ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <SidebarProvider>
          <AppLayout>
            <AllRoutes />
          </AppLayout>
        </SidebarProvider>
      )}
    </>
  );
}