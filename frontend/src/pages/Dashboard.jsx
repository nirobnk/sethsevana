import React from "react";
import {
  Users,
  UserCheck,
  Calendar,
  CalendarCheck,
  Clock,
  TrendingUp,
  DollarSign,
  Activity,
  Stethoscope,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Star,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export const Dashboard=()=> {
  // Mock data for dashboard metrics
  const dashboardStats = {
    totalPatients: 1,
    totalDoctors: 5,
    todayAppointments: 12,
    pendingAppointments: 8,
    completedAppointments: 156,
    cancelledAppointments: 23,
    monthlyRevenue: 45000,
    revenueGrowth: 12.5,
  };

  const recentAppointments = [
    {
      id: 1,
      patientName: "KVC Niluminda",
      doctorName: "Dr. Sarah Johnson",
      time: "10:00 AM",
      status: "confirmed",
      type: "General Checkup",
    },
    {
      id: 2,
      patientName: "John Doe",
      doctorName: "Dr. Mike Chen",
      time: "11:30 AM",
      status: "pending",
      type: "Cardiology",
    },
    {
      id: 3,
      patientName: "Jane Smith",
      doctorName: "Dr. Emily Davis",
      time: "2:00 PM",
      status: "completed",
      type: "Dermatology",
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      doctorName: "Dr. David Kumar",
      time: "3:30 PM",
      status: "cancelled",
      type: "Orthopedic",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const StatCard = ({ icon, title, value, change, changeType, color }) => {
    const IconComponent = icon;
    const TrendIcon = changeType === "increase" ? ArrowUp : ArrowDown;

    return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        {change && (
          <div
            className={`flex items-center space-x-1 ${
              changeType === "increase" ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{change}%</span>
          </div>
        )}
      </div>
    </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to Seth Sevana Admin Portal
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening at your clinic today
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">
              System Online
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Patients"
          value={dashboardStats.totalPatients}
          color="bg-blue-500"
        />
        <StatCard
          icon={Stethoscope}
          title="Total Doctors"
          value={dashboardStats.totalDoctors}
          color="bg-green-500"
        />
        <StatCard
          icon={Calendar}
          title="Today's Appointments"
          value={dashboardStats.todayAppointments}
          change={8.2}
          changeType="increase"
          color="bg-purple-500"
        />
        <StatCard
          icon={DollarSign}
          title="Monthly Revenue"
          value={`LKR ${dashboardStats.monthlyRevenue.toLocaleString()}`}
          change={dashboardStats.revenueGrowth}
          changeType="increase"
          color="bg-teal-500"
        />
      </div>

      {/* Appointment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Clock}
          title="Pending Appointments"
          value={dashboardStats.pendingAppointments}
          color="bg-yellow-500"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed"
          value={dashboardStats.completedAppointments}
          color="bg-blue-500"
        />
        <StatCard
          icon={XCircle}
          title="Cancelled"
          value={dashboardStats.cancelledAppointments}
          color="bg-red-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Success Rate"
          value="87.2%"
          change={3.1}
          changeType="increase"
          color="bg-green-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Appointments
              </h3>
            </div>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(appointment.status)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {appointment.patientName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.doctorName} - {appointment.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600">
                    {appointment.time}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              System Status
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">
                  Database Connection
                </span>
              </div>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">
                  Appointment System
                </span>
              </div>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">
                  Payment Gateway
                </span>
              </div>
              <span className="text-sm text-green-600 font-medium">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">
                  Last Backup
                </span>
              </div>
              <span className="text-sm text-yellow-600 font-medium">
                2 hours ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


