import React, { useMemo, useState } from "react";
import {
  Activity,
  Calendar,
  Edit,
  Eye,
  Mail,
  Phone,
  Save,
  Search,
  Trash2,
  User,
  UserPlus,
  Users,
  X,
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "KVC Niluminda",
    email: "niluminda@email.com",
    phone: "0743256782",
    nic: "20021400234",
    dateOfBirth: "2002-11-13",
    gender: "Male",
    address: "123 Main Street, Colombo 07",
    bloodGroup: "O+",
    emergencyContact: "0771234567",
    emergencyContactName: "Mother - Mrs. Niluminda",
    registrationDate: "2023-01-15",
    appointmentsCount: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Fernando",
    email: "sarah.fernando@email.com",
    phone: "0712345678",
    nic: "19951234567",
    dateOfBirth: "1995-06-20",
    gender: "Female",
    address: "456 Oak Avenue, Kandy",
    bloodGroup: "A+",
    emergencyContact: "0723456789",
    emergencyContactName: "Husband - Mr. Fernando",
    registrationDate: "2023-03-22",
    appointmentsCount: 8,
    status: "active",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "0759876543",
    nic: "19880345678",
    dateOfBirth: "1988-08-10",
    gender: "Male",
    address: "789 Palm Grove, Galle",
    bloodGroup: "B+",
    emergencyContact: "0718765432",
    emergencyContactName: "Wife - Mrs. Kumar",
    registrationDate: "2022-11-05",
    appointmentsCount: 15,
    status: "inactive",
  },
];

const emptyFormState = {
  name: "",
  email: "",
  phone: "",
  nic: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  bloodGroup: "",
  emergencyContact: "",
  emergencyContactName: "",
};

const calculateAge = (dateString) => {
  if (!dateString) {
    return "-";
  }
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
};

const formatDate = (dateString) => {
  if (!dateString) {
    return "-";
  }
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState(emptyFormState);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) => {
      return [user.name, user.email, user.phone, user.nic]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch));
    });
  }, [searchTerm, users]);

  const stats = useMemo(() => {
    const activeUsers = users.filter((user) => user.status === "active").length;
    const totalAppointments = users.reduce(
      (sum, user) => sum + (user.appointmentsCount ?? 0),
      0,
    );

    const thisMonth = new Date().toISOString().slice(0, 7);
    const newRegistrations = users.filter((user) =>
      user.registrationDate.startsWith(thisMonth),
    ).length;

    return {
      total: users.length,
      active: activeUsers,
      appointments: totalAppointments,
      newRegistrations,
    };
  }, [users]);

  const openModal = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    if (mode === "add" || !user) {
      setFormData(emptyFormState);
    } else {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        nic: user.nic,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        address: user.address,
        bloodGroup: user.bloodGroup,
        emergencyContact: user.emergencyContact,
        emergencyContactName: user.emergencyContactName,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData(emptyFormState);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (modalMode === "add") {
      const nextId = users.length
        ? Math.max(...users.map((user) => user.id)) + 1
        : 1;
      const newUser = {
        ...formData,
        id: nextId,
        status: "active",
        appointmentsCount: 0,
        registrationDate: new Date().toISOString().split("T")[0],
      };
      setUsers((prev) => [...prev, newUser]);
    }

    if (modalMode === "edit" && selectedUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...formData,
              }
            : user,
        ),
      );
    }

    closeModal();
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const renderStatusBadge = (status) => {
    const styles =
      status === "active"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-amber-100 text-amber-700";
    return (
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
        {status === "active" ? "Active" : "Inactive"}
      </span>
    );
  };

  const isReadOnly = modalMode === "view";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50 to-blue-50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-blue-600">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Patients</h1>
              <p className="text-gray-600">
                Search, review, and manage patient information effortlessly
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openModal("add")}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            <UserPlus className="h-4 w-4" />
            Add New Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
              <Users className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <User className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Patients</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Appointments Completed</p>
              <p className="text-2xl font-bold text-blue-600">{stats.appointments}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">New This Month</p>
              <p className="text-2xl font-bold text-purple-600">{stats.newRegistrations}</p>
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
              placeholder="Search patients by name, email, phone, or NIC"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{filteredUsers.length}</span> results
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Registered
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Appointments
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
                        {user.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">NIC: {user.nic}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {user.email}
                      </span>
                      <span className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {user.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-col gap-1">
                      <span>Age: {calculateAge(user.dateOfBirth)}</span>
                      <span>Joined {formatDate(user.registrationDate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {user.appointmentsCount}
                    </span>
                  </td>
                  <td className="px-6 py-4">{renderStatusBadge(user.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openModal("view", user)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-teal-200 hover:text-teal-600"
                        aria-label="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openModal("edit", user)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-blue-200 hover:text-blue-600"
                        aria-label="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-red-200 hover:text-red-600"
                        aria-label="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {modalMode === "add" && "Add New Patient"}
                  {modalMode === "view" && "Patient Details"}
                  {modalMode === "edit" && "Edit Patient"}
                </h2>
                {selectedUser && modalMode !== "add" && (
                  <p className="text-sm text-gray-500">Last updated {formatDate(selectedUser.registrationDate)}</p>
                )}
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
              {isReadOnly ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">Full Name</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">Email</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser?.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">Phone</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser?.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">NIC</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser?.nic}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">Date of Birth</p>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(selectedUser?.dateOfBirth)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">Gender</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser?.gender}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">Address</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser?.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">Emergency Contact</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser?.emergencyContactName} - {selectedUser?.emergencyContact}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">Blood Group</p>
                      <p className="mt-1 text-sm text-red-600">{selectedUser?.bloodGroup}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">Appointments Completed</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser?.appointmentsCount}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Full Name
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Email Address
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Phone Number
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      NIC Number
                      <input
                        name="nic"
                        value={formData.nic}
                        onChange={handleInputChange}
                        required
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Date of Birth
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Gender
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700 md:col-span-2">
                      Address
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={2}
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Blood Group
                      <input
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Emergency Contact Name
                      <input
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleInputChange}
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Emergency Contact Number
                      <input
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </label>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
