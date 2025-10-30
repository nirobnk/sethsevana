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
  Stethoscope,
  MapPin,
  Star,
  Clock,
  Heart,
  Brain,
  Bone,
  Baby,
  Shield,
  Zap,
  CheckCircle,
  Filter,
  ChevronDown,
} from "lucide-react";

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    email: "sarah.johnson@hospital.com",
    phone: "+94 11 234 5678",
    experience: 15,
    qualification: "MD, FRCP",
    location: "Main Building - Floor 3",
    consultationFee: 3500,
    rating: 4.9,
    status: "active",
    joinDate: "2019-03-15",
    patientsCount: 1250,
    specialtyIcon: Heart,
    bio: "Experienced cardiologist specializing in interventional cardiology and heart disease prevention.",
    workingHours: "Mon-Fri: 9:00 AM - 5:00 PM",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    email: "michael.chen@hospital.com",
    phone: "+94 11 234 5679",
    experience: 12,
    qualification: "MD, DM Neurology",
    location: "Neuro Center - Floor 2",
    consultationFee: 4000,
    rating: 4.8,
    status: "active",
    joinDate: "2020-08-22",
    patientsCount: 890,
    specialtyIcon: Brain,
    bio: "Neurologist with expertise in epilepsy, stroke, and movement disorders.",
    workingHours: "Mon-Sat: 10:00 AM - 6:00 PM",
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialty: "Ophthalmology",
    email: "emily.davis@hospital.com",
    phone: "+94 11 234 5680",
    experience: 10,
    qualification: "MBBS, MS Ophthalmology",
    location: "Eye Care Center - Floor 1",
    consultationFee: 3000,
    rating: 4.7,
    status: "inactive",
    joinDate: "2021-01-10",
    patientsCount: 650,
    specialtyIcon: Activity,
    bio: "Eye specialist focusing on cataract surgery and retinal disorders.",
    workingHours: "Tue-Sat: 9:00 AM - 4:00 PM",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    email: "james.wilson@hospital.com",
    phone: "+94 11 234 5681",
    experience: 18,
    qualification: "MBBS, MS Orthopedics",
    location: "Orthopedic Wing - Floor 4",
    consultationFee: 3800,
    rating: 4.9,
    status: "active",
    joinDate: "2018-06-05",
    patientsCount: 1540,
    specialtyIcon: Bone,
    bio: "Orthopedic surgeon specializing in joint replacement and sports medicine.",
    workingHours: "Mon-Fri: 8:00 AM - 6:00 PM",
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Pediatrics",
    email: "lisa.anderson@hospital.com",
    phone: "+94 11 234 5682",
    experience: 8,
    qualification: "MBBS, MD Pediatrics",
    location: "Children's Ward - Floor 2",
    consultationFee: 2500,
    rating: 4.8,
    status: "active",
    joinDate: "2022-02-14",
    patientsCount: 480,
    specialtyIcon: Baby,
    bio: "Pediatrician with special interest in child development and immunization.",
    workingHours: "Mon-Fri: 9:00 AM - 5:00 PM",
  },
];

const emptyFormState = {
  name: "",
  specialty: "General Medicine",
  email: "",
  phone: "",
  experience: "",
  qualification: "",
  location: "",
  consultationFee: "",
  bio: "",
  workingHours: "",
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

export const ManageDoctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState(emptyFormState);

  const specialties = [
    "General Medicine",
    "Cardiology",
    "Neurology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "Psychiatry",
    "Radiology",
  ];

  const specialtyIcons = {
    "General Medicine": Activity,
    Cardiology: Heart,
    Neurology: Brain,
    Ophthalmology: Activity,
    Orthopedics: Bone,
    Pediatrics: Baby,
    Dermatology: Shield,
    Psychiatry: Brain,
    Radiology: Zap,
  };

  const filteredDoctors = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSearch =
        !normalizedSearch ||
        [doctor.name, doctor.specialty, doctor.email, doctor.phone]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesSpecialty =
        selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;

      const matchesStatus =
        selectedStatus === "all" || doctor.status === selectedStatus;

      return matchesSearch && matchesSpecialty && matchesStatus;
    });
  }, [searchTerm, selectedSpecialty, selectedStatus, doctors]);

  const stats = useMemo(() => {
    const activeDoctors = doctors.filter(
      (doctor) => doctor.status === "active"
    ).length;
    const totalPatients = doctors.reduce(
      (sum, doctor) => sum + (doctor.patientsCount ?? 0),
      0
    );

    const thisMonth = new Date().toISOString().slice(0, 7);
    const newDoctors = doctors.filter((doctor) =>
      doctor.joinDate.startsWith(thisMonth)
    ).length;

    const avgRating = doctors.length
      ? (
          doctors.reduce((sum, doctor) => sum + (doctor.rating ?? 0), 0) /
          doctors.length
        ).toFixed(1)
      : 0;

    return {
      total: doctors.length,
      active: activeDoctors,
      patients: totalPatients,
      newDoctors,
      avgRating: Number(avgRating),
    };
  }, [doctors]);

  const openModal = (mode, doctor = null) => {
    setModalMode(mode);
    setSelectedDoctor(doctor);
    if (mode === "add" || !doctor) {
      setFormData(emptyFormState);
    } else {
      setFormData({
        name: doctor.name,
        specialty: doctor.specialty,
        email: doctor.email,
        phone: doctor.phone,
        experience: String(doctor.experience ?? ""),
        qualification: doctor.qualification,
        location: doctor.location,
        consultationFee: String(doctor.consultationFee ?? ""),
        bio: doctor.bio,
        workingHours: doctor.workingHours,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
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

    const experience = Number.parseInt(formData.experience, 10) || 0;
    const consultationFee = Number.parseInt(formData.consultationFee, 10) || 0;

    if (modalMode === "add") {
      const nextId = doctors.length
        ? Math.max(...doctors.map((doctor) => doctor.id)) + 1
        : 1;

      const newDoctor = {
        ...formData,
        id: nextId,
        rating: 0,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        patientsCount: 0,
        specialtyIcon: specialtyIcons[formData.specialty] || Activity,
        experience,
        consultationFee,
      };
      setDoctors((prev) => [...prev, newDoctor]);
    }

    if (modalMode === "edit" && selectedDoctor) {
      setDoctors((prev) =>
        prev.map((doctor) =>
          doctor.id === selectedDoctor.id
            ? {
                ...doctor,
                ...formData,
                experience,
                consultationFee,
                specialtyIcon:
                  specialtyIcons[formData.specialty] ?? doctor.specialtyIcon,
              }
            : doctor
        )
      );
    }

    closeModal();
  };

  const handleDelete = (doctorId) => {
    if (window.confirm("Are you sure you want to remove this doctor?")) {
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== doctorId));
    }
  };

  const renderStatusBadge = (status) => {
    const styles =
      status === "active"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-amber-100 text-amber-700";
    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
      >
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
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manage Doctors
              </h1>
              <p className="text-gray-600">
                Add, edit, and manage doctor information
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openModal("add")}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            <UserPlus className="h-4 w-4" />
            Add New Doctor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
              <Stethoscope className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Doctors</p>
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
              <p className="text-sm text-gray-500">Active Doctors</p>
              <p className="text-2xl font-bold text-emerald-600">
                {stats.active}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.patients}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Star className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.avgRating}
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
              placeholder="Search doctors by name, specialty, email, or phone"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(event) => setSelectedSpecialty(event.target.value)}
                className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-8 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-900">
            {filteredDoctors.length}
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
                  Doctor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Experience
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Patients
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
              {filteredDoctors.map((doctor) => {
                const SpecialtyIcon = doctor.specialtyIcon;
                return (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
                          {doctor.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {doctor.name}
                          </p>
                          <div className="flex items-center gap-1">
                            <SpecialtyIcon className="h-3 w-3 text-teal-600" />
                            <p className="text-xs text-teal-600">
                              {doctor.specialty}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {doctor.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {doctor.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-900">
                          {doctor.experience} years
                        </span>
                        <span className="text-xs">{doctor.qualification}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">
                        {doctor.patientsCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {renderStatusBadge(doctor.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openModal("view", doctor)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-teal-200 hover:text-teal-600"
                          aria-label="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openModal("edit", doctor)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-blue-200 hover:text-blue-600"
                          aria-label="Edit doctor"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(doctor.id)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-red-200 hover:text-red-600"
                          aria-label="Delete doctor"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
                  {modalMode === "add" && "Add New Doctor"}
                  {modalMode === "view" && "Doctor Details"}
                  {modalMode === "edit" && "Edit Doctor"}
                </h2>
                {selectedDoctor && modalMode !== "add" && (
                  <p className="text-sm text-gray-500">
                    Joined {formatDate(selectedDoctor.joinDate)}
                  </p>
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
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-700">
                      {selectedDoctor?.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedDoctor?.name}
                      </h3>
                      <p className="font-medium text-teal-600">
                        {selectedDoctor?.specialty}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {selectedDoctor?.rating} Rating
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {selectedDoctor?.patientsCount} Patients
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-gray-900">
                        Contact Information
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {selectedDoctor?.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {selectedDoctor?.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {selectedDoctor?.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold text-gray-900">
                        Professional Details
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Experience:
                          </span>
                          <span className="text-sm font-medium">
                            {selectedDoctor?.experience} years
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Qualification:
                          </span>
                          <span className="text-sm font-medium">
                            {selectedDoctor?.qualification}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Consultation Fee:
                          </span>
                          <span className="text-sm font-medium">
                            Rs. {selectedDoctor?.consultationFee}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Join Date:
                          </span>
                          <span className="text-sm font-medium">
                            {formatDate(selectedDoctor?.joinDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Biography
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedDoctor?.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Working Hours
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedDoctor?.workingHours}
                    </p>
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
                        placeholder="Dr. John Doe"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Specialty
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        required
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {specialties.map((specialty) => (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
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
                        placeholder="doctor@hospital.com"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Phone Number
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="+94 11 234 5678"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Experience (years)
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        min="0"
                        max="50"
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="10"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Qualification
                      <input
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        required
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="MBBS, MD"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Location
                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Main Building - Floor 1"
                      />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                      Consultation Fee (Rs.)
                      <input
                        type="number"
                        name="consultationFee"
                        value={formData.consultationFee}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="3000"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Working Hours
                    <input
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Mon-Fri: 9:00 AM - 5:00 PM"
                    />
                  </label>

                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Biography
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Brief description about the doctor's expertise and experience..."
                    />
                  </label>

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
                      {modalMode === "add" ? "Add Doctor" : "Save Changes"}
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
