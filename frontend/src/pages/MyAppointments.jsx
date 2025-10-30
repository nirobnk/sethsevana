import React, { useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  Eye,
  X,
  Trash2,
  Edit,
  Stethoscope,
  User,
  CalendarCheck,
  CalendarX,
  CalendarClock,
  Phone,
  Mail,
  FileText,
} from "lucide-react";

const initialAppointments = [
  {
    id: 1,
    date: "2025-11-15",
    time: "10:00 AM",
    doctor: "Dr. Sarah Johnson",
    doctorEmail: "sarah.johnson@hospital.com",
    doctorPhone: "+94 11 234 5678",
    specialty: "Cardiology",
    status: "confirmed",
    location: "Main Building - Floor 3, Room 301",
    reason: "Regular heart checkup and ECG",
    notes: "Please bring previous test results",
    type: "Follow-up",
  },
  {
    id: 2,
    date: "2025-11-20",
    time: "2:30 PM",
    doctor: "Dr. Michael Chen",
    doctorEmail: "michael.chen@hospital.com",
    doctorPhone: "+94 11 234 5679",
    specialty: "Neurology",
    status: "pending",
    location: "Neuro Center - Floor 2, Room 205",
    reason: "Consultation for headaches",
    notes: "First visit",
    type: "Consultation",
  },
  {
    id: 3,
    date: "2025-10-28",
    time: "9:00 AM",
    doctor: "Dr. Emily Davis",
    doctorEmail: "emily.davis@hospital.com",
    doctorPhone: "+94 11 234 5680",
    specialty: "Ophthalmology",
    status: "completed",
    location: "Eye Care Center - Floor 1, Room 103",
    reason: "Eye examination",
    notes: "Prescription provided",
    type: "Checkup",
  },
  {
    id: 4,
    date: "2025-11-25",
    time: "11:00 AM",
    doctor: "Dr. James Wilson",
    doctorEmail: "james.wilson@hospital.com",
    doctorPhone: "+94 11 234 5681",
    specialty: "Orthopedics",
    status: "cancelled",
    location: "Orthopedic Wing - Floor 4, Room 402",
    reason: "Knee pain assessment",
    notes: "Cancelled by patient",
    type: "Consultation",
  },
  {
    id: 5,
    date: "2025-11-05",
    time: "3:00 PM",
    doctor: "Dr. Lisa Anderson",
    doctorEmail: "lisa.anderson@hospital.com",
    doctorPhone: "+94 11 234 5682",
    specialty: "Pediatrics",
    status: "confirmed",
    location: "Children's Ward - Floor 2, Room 210",
    reason: "Child vaccination",
    notes: "Bring vaccination card",
    type: "Vaccination",
  },
];

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const isUpcoming = (dateString) => {
  return new Date(dateString) > new Date();
};

export const MyAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointmentTypes = [
    "Consultation",
    "Follow-up",
    "Checkup",
    "Vaccination",
  ];

  const filteredAppointments = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesSearch =
        !normalizedSearch ||
        appointment.doctor.toLowerCase().includes(normalizedSearch) ||
        appointment.specialty.toLowerCase().includes(normalizedSearch) ||
        appointment.reason.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        selectedStatus === "all" || appointment.status === selectedStatus;

      const matchesType =
        selectedType === "all" || appointment.type === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, selectedStatus, selectedType, appointments]);

  const stats = useMemo(() => {
    const confirmed = appointments.filter(
      (a) => a.status === "confirmed"
    ).length;
    const pending = appointments.filter((a) => a.status === "pending").length;
    const completed = appointments.filter(
      (a) => a.status === "completed"
    ).length;
    const upcoming = appointments.filter(
      (a) => isUpcoming(a.date) && a.status !== "cancelled"
    ).length;

    return {
      total: appointments.length,
      confirmed,
      pending,
      completed,
      upcoming,
    };
  }, [appointments]);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: "cancelled" }
            : appointment
        )
      );
      if (selectedAppointment?.id === id) {
        closeModal();
      }
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        icon: CheckCircle,
        label: "Confirmed",
      },
      pending: {
        bg: "bg-amber-100",
        text: "text-amber-700",
        icon: Clock,
        label: "Pending",
      },
      completed: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: CheckCircle,
        label: "Completed",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
        label: "Cancelled",
      },
    };
    return configs[status] || configs.pending;
  };

  const renderStatusBadge = (status) => {
    const config = getStatusConfig(status);
    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50 to-blue-50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-blue-600">
              <CalendarCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Appointments
              </h1>
              <p className="text-gray-600">
                View and manage your medical appointments
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
              <Calendar className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Confirmed</p>
              <p className="text-2xl font-bold text-emerald-600">
                {stats.confirmed}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <CalendarClock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.upcoming}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.completed}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search by doctor, specialty, or reason..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-8 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Types</option>
                {appointmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-8 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-900">
            {filteredAppointments.length}
          </span>{" "}
          results
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Doctor & Specialty
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
                        {appointment.doctor
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {appointment.doctor}
                        </p>
                        <p className="text-xs text-teal-600">
                          {appointment.specialty}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {formatDate(appointment.date)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {appointment.time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        {appointment.location}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {appointment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {renderStatusBadge(appointment.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openModal(appointment)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-teal-200 hover:text-teal-600"
                        aria-label="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {(appointment.status === "confirmed" ||
                        appointment.status === "pending") && (
                        <>
                          <button
                            type="button"
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-blue-200 hover:text-blue-600"
                            aria-label="Reschedule"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(appointment.id)}
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-red-200 hover:text-red-600"
                            aria-label="Cancel appointment"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="py-12 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">No appointments found</p>
          </div>
        )}
      </div>

      {showModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Appointment Details
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(selectedAppointment.date)} at{" "}
                  {selectedAppointment.time}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  {renderStatusBadge(selectedAppointment.status)}
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {selectedAppointment.type}
                  </span>
                  {isUpcoming(selectedAppointment.date) &&
                    selectedAppointment.status !== "cancelled" && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        Upcoming
                      </span>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      Doctor
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {selectedAppointment.doctor}
                    </p>
                    <p className="mt-1 text-sm text-teal-600">
                      {selectedAppointment.specialty}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      Appointment Date & Time
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-900">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {formatDate(selectedAppointment.date)}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-900">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {selectedAppointment.time}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Location
                  </p>
                  <p className="mt-1 flex items-start gap-2 text-sm text-gray-900">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    {selectedAppointment.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Reason for Visit
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedAppointment.reason}
                  </p>
                </div>

                {selectedAppointment.notes && (
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      Notes
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {selectedAppointment.notes}
                    </p>
                  </div>
                )}

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    Doctor Contact
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {selectedAppointment.doctorEmail}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {selectedAppointment.doctorPhone}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                  {(selectedAppointment.status === "confirmed" ||
                    selectedAppointment.status === "pending") && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleDelete(selectedAppointment.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Cancel Appointment
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
                      >
                        <Edit className="h-4 w-4" />
                        Reschedule
                      </button>
                    </>
                  )}
                  {selectedAppointment.status === "completed" && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
                    >
                      <FileText className="h-4 w-4" />
                      View Report
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
