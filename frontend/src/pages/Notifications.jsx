import React, { useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  CheckCircle,
  X,
  Search,
  Filter,
  ChevronDown,
  Trash2,
  Calendar,
  User,
  Stethoscope,
  AlertCircle,
  Info,
  Heart,
  Clock,
  Check,
  Settings,
  Eye,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "appointment",
    title: "Upcoming Appointment",
    message:
      "You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM",
    timestamp: "2025-10-29T14:30:00",
    read: false,
    priority: "high",
    icon: Calendar,
    color: "blue",
    actionable: true,
  },
  {
    id: 2,
    type: "appointment",
    title: "Appointment Confirmed",
    message:
      "Your appointment with Dr. Michael Chen has been confirmed for Nov 5, 2025",
    timestamp: "2025-10-29T10:15:00",
    read: false,
    priority: "medium",
    icon: CheckCircle,
    color: "green",
    actionable: false,
  },
  {
    id: 3,
    type: "medical",
    title: "Medical Report Ready",
    message:
      "Your blood test results from Oct 25, 2025 are now available for review",
    timestamp: "2025-10-28T16:45:00",
    read: true,
    priority: "high",
    icon: Heart,
    color: "red",
    actionable: true,
  },
  {
    id: 4,
    type: "payment",
    title: "Payment Successful",
    message:
      "Your payment of Rs. 3,500 for consultation has been processed successfully",
    timestamp: "2025-10-28T09:20:00",
    read: true,
    priority: "low",
    icon: CheckCircle,
    color: "green",
    actionable: false,
  },
  {
    id: 5,
    type: "reminder",
    title: "Medication Reminder",
    message: "Time to take your prescribed medication - Aspirin 75mg",
    timestamp: "2025-10-27T08:00:00",
    read: true,
    priority: "medium",
    icon: Clock,
    color: "orange",
    actionable: true,
  },
  {
    id: 6,
    type: "system",
    title: "Profile Update Required",
    message: "Please update your emergency contact information in your profile",
    timestamp: "2025-10-26T11:30:00",
    read: false,
    priority: "medium",
    icon: AlertCircle,
    color: "yellow",
    actionable: true,
  },
  {
    id: 7,
    type: "appointment",
    title: "Appointment Cancelled",
    message:
      "Dr. Emily Davis has cancelled your appointment scheduled for Oct 30, 2025",
    timestamp: "2025-10-25T15:10:00",
    read: true,
    priority: "high",
    icon: X,
    color: "red",
    actionable: false,
  },
  {
    id: 8,
    type: "doctor",
    title: "New Doctor Available",
    message: "Dr. Lisa Anderson (Pediatrics) has joined our hospital",
    timestamp: "2025-10-24T13:00:00",
    read: true,
    priority: "low",
    icon: Stethoscope,
    color: "teal",
    actionable: false,
  },
];

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const notificationTypes = [
    { value: "all", label: "All Types" },
    { value: "appointment", label: "Appointments" },
    { value: "medical", label: "Medical" },
    { value: "payment", label: "Payments" },
    { value: "reminder", label: "Reminders" },
    { value: "system", label: "System" },
    { value: "doctor", label: "Doctors" },
  ];

  const filteredNotifications = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesSearch =
        !normalizedSearch ||
        notification.title.toLowerCase().includes(normalizedSearch) ||
        notification.message.toLowerCase().includes(normalizedSearch);

      const matchesType =
        selectedType === "all" || notification.type === selectedType;

      const matchesFilter =
        selectedFilter === "all" ||
        (selectedFilter === "unread" && !notification.read) ||
        (selectedFilter === "read" && notification.read);

      return matchesSearch && matchesType && matchesFilter;
    });
  }, [searchTerm, selectedType, selectedFilter, notifications]);

  const stats = useMemo(() => {
    const unreadCount = notifications.filter((n) => !n.read).length;
    const todayCount = notifications.filter((n) => {
      const today = new Date().toDateString();
      return new Date(n.timestamp).toDateString() === today;
    }).length;
    const urgentCount = notifications.filter(
      (n) => n.priority === "high" && !n.read
    ).length;
    const actionableCount = notifications.filter(
      (n) => n.actionable && !n.read
    ).length;

    return {
      total: notifications.length,
      unread: unreadCount,
      today: todayCount,
      urgent: urgentCount,
      actionable: actionableCount,
    };
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
      if (selectedNotification?.id === id) {
        closeModal();
      }
    }
  };

  const openModal = (notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  const getColorClasses = (color, variant = "bg") => {
    const colors = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "hover:border-blue-300",
      },
      green: {
        bg: "bg-emerald-100",
        text: "text-emerald-600",
        border: "border-emerald-200",
        hover: "hover:border-emerald-300",
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-200",
        hover: "hover:border-red-300",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-200",
        hover: "hover:border-orange-300",
      },
      yellow: {
        bg: "bg-amber-100",
        text: "text-amber-600",
        border: "border-amber-200",
        hover: "hover:border-amber-300",
      },
      teal: {
        bg: "bg-teal-100",
        text: "text-teal-600",
        border: "border-teal-200",
        hover: "hover:border-teal-300",
      },
    };
    return colors[color]?.[variant] || colors.blue[variant];
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-red-100 text-red-700",
      medium: "bg-amber-100 text-amber-700",
      low: "bg-gray-100 text-gray-700",
    };
    const labels = {
      high: "Urgent",
      medium: "Medium",
      low: "Low",
    };
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[priority]}`}
      >
        {labels[priority]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50 to-blue-50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-blue-600">
              <BellRing className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Notifications
              </h1>
              <p className="text-gray-600">
                Stay updated with your appointments and health information
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            <Check className="h-4 w-4" />
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
              <Bell className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <BellRing className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Unread</p>
              <p className="text-2xl font-bold text-blue-600">{stats.unread}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Urgent</p>
              <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Action Required</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.actionable}
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
              placeholder="Search notifications..."
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
                {notificationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(event) => setSelectedFilter(event.target.value)}
                className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-8 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-900">
            {filteredNotifications.length}
          </span>{" "}
          results
        </p>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`group rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${
                notification.read
                  ? "border-gray-200"
                  : `border-l-4 ${getColorClasses(
                      notification.color,
                      "border"
                    )} border-t border-r border-b border-gray-200`
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${getColorClasses(
                    notification.color,
                    "bg"
                  )}`}
                >
                  <Icon
                    className={`h-6 w-6 ${getColorClasses(
                      notification.color,
                      "text"
                    )}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      {getPriorityBadge(notification.priority)}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                      {notification.actionable && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                          <Clock className="h-3 w-3" />
                          Action Required
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => openModal(notification)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-teal-200 hover:text-teal-600"
                        aria-label="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() => markAsRead(notification.id)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-blue-200 hover:text-blue-600"
                          aria-label="Mark as read"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteNotification(notification.id)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-red-200 hover:text-red-600"
                        aria-label="Delete notification"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <Bell className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">No notifications found</p>
          </div>
        )}
      </div>

      {showModal && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${getColorClasses(
                    selectedNotification.color,
                    "bg"
                  )}`}
                >
                  {React.createElement(selectedNotification.icon, {
                    className: `h-5 w-5 ${getColorClasses(
                      selectedNotification.color,
                      "text"
                    )}`,
                  })}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedNotification.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(selectedNotification.timestamp)}
                  </p>
                </div>
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
                  {getPriorityBadge(selectedNotification.priority)}
                  {selectedNotification.actionable && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      <Clock className="h-3 w-3" />
                      Action Required
                    </span>
                  )}
                  <span className="capitalize rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {selectedNotification.type}
                  </span>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">
                    Message
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedNotification.message}
                  </p>
                </div>

                {selectedNotification.actionable && (
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-purple-900 mb-1">
                          Action Required
                        </h4>
                        <p className="text-sm text-purple-700">
                          This notification requires your attention. Please take
                          the necessary action.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Status
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedNotification.read ? "Read" : "Unread"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Time
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatTimeAgo(selectedNotification.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                  <button
                    type="button"
                    onClick={() => deleteNotification(selectedNotification.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
