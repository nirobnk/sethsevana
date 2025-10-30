import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react';

export const Appointments = ()=> {
  // Simple mock data for all appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "KVC Niluminda",
      patientPhone: "0743256782",
      date: "2024-01-15",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      status: "pending",
      reason: "Regular checkup"
    },
    {
      id: 2,
      patientName: "John Doe",
      patientPhone: "0771234567",
      date: "2024-01-15",
      time: "2:30 PM", 
      doctor: "Dr. Mike Chen",
      specialty: "Cardiology",
      status: "confirmed",
      reason: "Heart consultation"
    },
    {
      id: 3,
      patientName: "Jane Smith",
      patientPhone: "0789876543",
      date: "2024-01-16",
      time: "9:00 AM",
      doctor: "Dr. Emily Davis", 
      specialty: "Dermatology",
      status: "completed",
      reason: "Skin problem"
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      patientPhone: "0765432109",
      date: "2024-01-16",
      time: "11:00 AM",
      doctor: "Dr. David Kumar",
      specialty: "Orthopedic",
      status: "cancelled",
      reason: "Back pain"
    },
    {
      id: 5,
      patientName: "Alice Johnson",
      patientPhone: "0712345678",
      date: "2024-01-17",
      time: "3:00 PM",
      doctor: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      status: "pending",
      reason: "Follow-up visit"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState("all");

  // Simple function to update appointment status
  const updateStatus = (appointmentId, newStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: newStatus }
        : appointment
    ));
  };

  // Simple function to get status color
  const getStatusColor = (status) => {
    if (status === "confirmed") return "bg-green-100 text-green-800";
    if (status === "pending") return "bg-yellow-100 text-yellow-800";
    if (status === "completed") return "bg-blue-100 text-blue-800";
    if (status === "cancelled") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  // Simple function to get status icon
  const getStatusIcon = (status) => {
    if (status === "confirmed") return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === "pending") return <Clock className="w-4 h-4 text-yellow-500" />;
    if (status === "completed") return <CheckCircle className="w-4 h-4 text-blue-500" />;
    if (status === "cancelled") return <XCircle className="w-4 h-4 text-red-500" />;
    return <AlertCircle className="w-4 h-4 text-gray-500" />;
  };

  // Simple filter function
  const filteredAppointments = filterStatus === "all" 
    ? appointments 
    : appointments.filter(appointment => appointment.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header with Filter */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Appointments</h1>
            <p className="text-gray-600 mt-1">Manage all patient appointments</p>
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h3 className="text-yellow-800 font-semibold">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {appointments.filter(a => a.status === "pending").length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="text-green-800 font-semibold">Confirmed</h3>
          <p className="text-2xl font-bold text-green-600">
            {appointments.filter(a => a.status === "confirmed").length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-blue-800 font-semibold">Completed</h3>
          <p className="text-2xl font-bold text-blue-600">
            {appointments.filter(a => a.status === "completed").length}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h3 className="text-red-800 font-semibold">Cancelled</h3>
          <p className="text-2xl font-bold text-red-600">
            {appointments.filter(a => a.status === "cancelled").length}
          </p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
            {/* Appointment Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{appointment.patientPhone}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(appointment.status)}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{appointment.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{appointment.time}</span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Doctor:</strong> {appointment.doctor}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Specialty:</strong> {appointment.specialty}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600"><strong>Reason:</strong> {appointment.reason}</p>
            </div>

            {/* Admin Action Buttons */}
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => updateStatus(appointment.id, "confirmed")}
                className="px-3 py-2 text-green-600 border border-green-300 rounded-lg hover:bg-green-50 text-sm"
                disabled={appointment.status === "confirmed"}
              >
                Confirm
              </button>
              <button 
                onClick={() => updateStatus(appointment.id, "completed")}
                className="px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 text-sm"
                disabled={appointment.status === "completed"}
              >
                Complete
              </button>
              <button 
                onClick={() => updateStatus(appointment.id, "cancelled")}
                className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 text-sm"
                disabled={appointment.status === "cancelled"}
              >
                Cancel
              </button>
              <button 
                onClick={() => updateStatus(appointment.id, "pending")}
                className="px-3 py-2 text-yellow-600 border border-yellow-300 rounded-lg hover:bg-yellow-50 text-sm"
              >
                Set Pending
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No appointments message */}
      {filteredAppointments.length === 0 && (
        <div className="bg-white rounded-lg p-8 shadow-sm border text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-600">No appointments match the selected filter.</p>
        </div>
      )}
    </div>
  );
}

