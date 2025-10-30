import React from 'react';
import { Calendar, Clock, User, MapPin, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const MyAppointments = () => {
  // Simple mock data - easy to understand
  const myAppointments = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      status: "confirmed",
      location: "Room 101"
    },
    {
      id: 2,
      date: "2024-01-20",
      time: "2:30 PM", 
      doctor: "Dr. Mike Chen",
      specialty: "Cardiology",
      status: "pending",
      location: "Room 205"
    },
    {
      id: 3,
      date: "2024-01-10",
      time: "9:00 AM",
      doctor: "Dr. Emily Davis", 
      specialty: "Dermatology",
      status: "completed",
      location: "Room 103"
    },
    {
      id: 4,
      date: "2024-01-25",
      time: "11:00 AM",
      doctor: "Dr. David Kumar",
      specialty: "Orthopedic",
      status: "cancelled",
      location: "Room 302"
    }
  ];

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

  return (
    <div className="space-y-6">
      {/* Simple Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-gray-600 mt-1">View and manage your appointments</p>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {myAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
            {/* Appointment Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Date: {appointment.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Time: {appointment.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Location: {appointment.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              {appointment.status === "confirmed" && (
                <>
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
                    Cancel
                  </button>
                </>
              )}
              {appointment.status === "pending" && (
                <button className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                  View Details
                </button>
              )}
              {appointment.status === "completed" && (
                <button className="px-4 py-2 text-green-600 border border-green-300 rounded-lg hover:bg-green-50">
                  View Report
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Simple Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Appointment Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">4</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">1</p>
            <p className="text-sm text-gray-600">Confirmed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">1</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">1</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

