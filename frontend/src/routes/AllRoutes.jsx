import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  BookAppointment,
  Dashboard,
  ManageDoctors,
  ManageUsers,
  MyAppointments,
  ProfileSection,

} from "../pages/index";

export const AllRoutes = () => {
  return (
    <>
      
      <main>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/book/:doctorId?" element={<BookAppointment />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/doctors" element={<ManageDoctors />} />
          <Route path="/profile" element={<ProfileSection />} />
          <Route path="/patients" element={<ManageUsers />} />
        </Routes>
      </main>
    </>
  );
};
