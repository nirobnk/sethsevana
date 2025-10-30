import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "./components/Sidebar";
import { AppLayout } from "./components/AppLayout";
import {
  Login,
  Register,
  Dashboard,
  BookAppointment,
  ManageDoctors,
  ManageUsers,
  MyAppointments,
  Notifications,
  ProfileSection,
} from "./pages";

export default function App() {
  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book/:doctorId?" element={<BookAppointment />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/doctors" element={<ManageDoctors />} />
          <Route path="/patients" element={<ManageUsers />} />
          <Route path="/profile" element={<ProfileSection />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </SidebarProvider>
  );
}
