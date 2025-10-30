import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowUpDown,
  Calendar,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  Clock,
  Phone,
  Search,
  Stethoscope,
  User,
  XCircle,
} from 'lucide-react';

export const Appointments = () => {
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
      reason: "Regular checkup",
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
      reason: "Heart consultation",
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
      reason: "Skin problem",
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
      reason: "Back pain",
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
      reason: "Follow-up visit",
    },
  ]);

  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("upcoming");

  const updateStatus = (appointmentId, newStatus) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  const getStatusClasses = (status) => {
    if (status === "confirmed") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    if (status === "pending") return "bg-amber-50 text-amber-700 ring-amber-200";
    if (status === "completed") return "bg-sky-50 text-sky-700 ring-sky-200";
    if (status === "cancelled") return "bg-rose-50 text-rose-700 ring-rose-200";
    return "bg-slate-50 text-slate-700 ring-slate-200";
  };

  const getStatusIcon = (status) => {
    if (status === "confirmed") return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (status === "pending") return <Clock className="w-4 h-4 text-amber-500" />;
    if (status === "completed") return <CheckCircle className="w-4 h-4 text-sky-500" />;
    if (status === "cancelled") return <XCircle className="w-4 h-4 text-rose-500" />;
    return <AlertCircle className="w-4 h-4 text-slate-500" />;
  };

  const parseDateTime = (appointment) => {
    const baseDate = new Date(appointment.date);
    if (Number.isNaN(baseDate.getTime())) {
      return new Date();
    }

    const [timePart, modifier] = appointment.time.split(" ");
    const [rawHours, rawMinutes] = timePart.split(":").map((part) => parseInt(part, 10));

    let hours = rawHours % 12;
    if (modifier?.toUpperCase() === "PM") {
      hours += 12;
    }

    baseDate.setHours(hours, rawMinutes || 0, 0, 0);
    return baseDate;
  };

  const summary = useMemo(() => {
    const base = {
      total: appointments.length,
      upcoming: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    const now = new Date();
    appointments.forEach((appointment) => {
      base[appointment.status] = (base[appointment.status] ?? 0) + 1;
      if (parseDateTime(appointment) >= now) {
        base.upcoming += 1;
      }
    });

    return base;
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matches = appointments.filter((appointment) => {
      const matchesStatus =
        activeStatus === "all" || appointment.status === activeStatus;

      if (!matchesStatus) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = [
        appointment.patientName,
        appointment.patientPhone,
        appointment.doctor,
        appointment.specialty,
        appointment.reason,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });

    return matches.sort((a, b) => {
      const diff = parseDateTime(a) - parseDateTime(b);
      return sortOrder === "upcoming" ? diff : -diff;
    });
  }, [appointments, activeStatus, searchQuery, sortOrder]);

  const statusTabs = [
    {
      value: "all",
      label: "All",
      description: `${summary.total} records`,
      icon: ClipboardList,
    },
    {
      value: "pending",
      label: "Pending",
      description: `${summary.pending} waiting`,
      icon: Clock,
    },
    {
      value: "confirmed",
      label: "Confirmed",
      description: `${summary.confirmed} locked in`,
      icon: CheckCircle,
    },
    {
      value: "completed",
      label: "Completed",
      description: `${summary.completed} finished`,
      icon: Stethoscope,
    },
    {
      value: "cancelled",
      label: "Cancelled",
      description: `${summary.cancelled} withdrawn`,
      icon: AlertCircle,
    },
  ];

  const formatStatusLabel = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-6 top-6 hidden md:block">
          <CalendarDays className="w-16 h-16 text-white/20" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="uppercase text-xs tracking-[0.3em] text-white/70 font-semibold">
                Appointments Overview
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold mt-2">
                All Appointments
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                Track every patient visit at a glance. Filter, search, and take action on your schedule without leaving this screen.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:w-80">
              <div className="rounded-2xl bg-white/15 backdrop-blur px-4 py-3 border border-white/10">
                <p className="text-xs uppercase tracking-wider text-white/70">
                  Total
                </p>
                <p className="text-2xl font-semibold">{summary.total}</p>
              </div>
              <div className="rounded-2xl bg-white/15 backdrop-blur px-4 py-3 border border-white/10">
                <p className="text-xs uppercase tracking-wider text-white/70">
                  Upcoming
                </p>
                <p className="text-2xl font-semibold">{summary.upcoming}</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur px-4 py-3 border border-white/10 col-span-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/70">
                    Last Updated
                  </p>
                  <p className="text-sm font-medium">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by patient, doctor, specialty, or reason"
              className="w-full rounded-2xl border border-slate-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 bg-slate-50">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">Sort</span>
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "upcoming" ? "recent" : "upcoming"))
              }
              className="text-sm font-medium text-slate-800 hover:text-teal-600 transition"
            >
              {sortOrder === "upcoming" ? "Soonest first" : "Most recent first"}
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
          {statusTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeStatus === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setActiveStatus(tab.value)}
                className={[
                  "flex min-w-[160px] flex-1 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition",
                  isActive
                    ? "border-teal-500 bg-teal-50 text-teal-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:bg-teal-50/40",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-xl border",
                    isActive
                      ? "border-transparent bg-teal-500 text-white"
                      : "border-slate-200 bg-slate-50 text-teal-600",
                  ].join(" ")}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span>
                  <p className="text-sm font-semibold">{tab.label}</p>
                  <p className="text-xs text-slate-500">{tab.description}</p>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Pending",
            value: summary.pending,
            accent: "bg-amber-50 border-amber-200 text-amber-700",
            icon: Clock,
          },
          {
            label: "Confirmed",
            value: summary.confirmed,
            accent: "bg-emerald-50 border-emerald-200 text-emerald-700",
            icon: CheckCircle,
          },
          {
            label: "Completed",
            value: summary.completed,
            accent: "bg-sky-50 border-sky-200 text-sky-700",
            icon: Stethoscope,
          },
          {
            label: "Cancelled",
            value: summary.cancelled,
            accent: "bg-rose-50 border-rose-200 text-rose-700",
            icon: AlertCircle,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`rounded-3xl border p-5 shadow-sm ${item.accent} flex flex-col gap-2`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70">
                  <Icon className="w-5 h-5" />
                </span>
                <p className="text-sm font-semibold">{item.label}</p>
              </div>
              <p className="text-3xl font-semibold">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-5">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
                      <User className="w-7 h-7" />
                    </div>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg">
                      #{appointment.id}
                    </span>
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {appointment.patientName}
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                        <Phone className="w-3.5 h-3.5" />
                        {appointment.patientPhone}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {appointment.date}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {appointment.time}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-slate-400" />
                        {appointment.doctor}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-slate-400" />
                        {appointment.specialty}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-inset",
                    getStatusClasses(appointment.status),
                  ].join(" ")}
                >
                  {getStatusIcon(appointment.status)}
                  <span>{formatStatusLabel(appointment.status)}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3 text-sm text-slate-600">
                <p className="font-medium text-slate-800">Visit reason</p>
                <p className="mt-1 flex items-start gap-2">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-teal-500" />
                  {appointment.reason}
                </p>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <button
                  onClick={() => updateStatus(appointment.id, "confirmed")}
                  className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 disabled:border-slate-100 disabled:text-slate-400 disabled:bg-slate-50"
                  disabled={appointment.status === "confirmed"}
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(appointment.id, "completed")}
                  className="inline-flex items-center justify-center rounded-full border border-sky-200 px-4 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 disabled:border-slate-100 disabled:text-slate-400 disabled:bg-slate-50"
                  disabled={appointment.status === "completed"}
                >
                  Complete
                </button>
                <button
                  onClick={() => updateStatus(appointment.id, "cancelled")}
                  className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 disabled:border-slate-100 disabled:text-slate-400 disabled:bg-slate-50"
                  disabled={appointment.status === "cancelled"}
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateStatus(appointment.id, "pending")}
                  className="inline-flex items-center justify-center rounded-full border border-amber-200 px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50"
                >
                  Set Pending
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200 text-center space-y-3">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-semibold text-slate-900">
            No appointments found
          </h3>
          <p className="text-sm text-slate-500">
            Adjust your filters or search to see appointments in this view.
          </p>
        </div>
      )}
    </div>
  );
};
