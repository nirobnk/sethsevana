import React, { useMemo, useState } from "react";
import {
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  X, 
  Save,
  UserPlus,
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Users,
  Clock,
  Heart,
  Brain,
  Bone,
  Baby,
  Activity,
  Scissors,
  Zap,
  Shield,
  ChevronDown,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([
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
      image: "SJ",
      specialtyIcon: Heart,
      bio: "Experienced cardiologist specializing in interventional cardiology and heart disease prevention.",
      workingHours: "Mon-Fri: 9:00 AM - 5:00 PM"
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
      image: "MC",
      specialtyIcon: Brain,
      bio: "Neurologist with expertise in epilepsy, stroke, and movement disorders.",
      workingHours: "Mon-Sat: 10:00 AM - 6:00 PM"
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
      image: "ED",
      specialtyIcon: Activity,
      bio: "Eye specialist focusing on cataract surgery and retinal disorders.",
      workingHours: "Tue-Sat: 9:00 AM - 4:00 PM"
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
      image: "JW",
      specialtyIcon: Bone,
      bio: "Orthopedic surgeon specializing in joint replacement and sports medicine.",
      workingHours: "Mon-Fri: 8:00 AM - 6:00 PM"
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
      image: "LA",
      specialtyIcon: Baby,
      bio: "Pediatrician with special interest in child development and immunization.",
      workingHours: "Mon-Fri: 9:00 AM - 5:00 PM"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
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
  });

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
        doctor.name.toLowerCase().includes(normalizedSearch) ||
        doctor.specialty.toLowerCase().includes(normalizedSearch) ||
        doctor.email.toLowerCase().includes(normalizedSearch);
      const matchesSpecialty =
        selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
      const matchesStatus =
        selectedStatus === "all" || doctor.status === selectedStatus;
      return matchesSearch && matchesSpecialty && matchesStatus;
    });
  }, [doctors, searchTerm, selectedSpecialty, selectedStatus]);

  const averageRating = useMemo(() => {
    if (!doctors.length) {
      return 0;
    }
    const total = doctors.reduce((sum, doctor) => sum + (doctor.rating ?? 0), 0);
    return Number((total / doctors.length).toFixed(1));
  }, [doctors]);

  const openModal = (mode, doctor = null) => {
    setModalMode(mode);
    setSelectedDoctor(doctor);
    if (doctor) {
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
    } else {
      setFormData({
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
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const experience = Number.parseInt(formData.experience, 10) || 0;
    const consultationFee = Number.parseInt(formData.consultationFee, 10) || 0;
    const initials = formData.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

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
        image: initials || "DR",
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
            : doctor,
        ),
      );
    }

    closeModal();
  };

  const handleDelete = (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== doctorId));
    }
  };

  const toggleStatus = (doctorId) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === doctorId
          ? {
              ...doctor,
              status: doctor.status === "active" ? "inactive" : "active",
            }
          : doctor,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Doctors</h1>
              <p className="text-gray-600">Add, edit, and manage doctor information</p>
            </div>
          </div>
          <button
            onClick={() => openModal('add')}
            className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add New Doctor</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Doctors</p>
              <p className="text-2xl font-bold text-green-600">{doctors.filter(d => d.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Inactive Doctors</p>
              <p className="text-2xl font-bold text-orange-600">{doctors.filter(d => d.status === 'inactive').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Rating</p>
              <p className="text-2xl font-bold text-purple-600">{averageRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name, specialty, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="all">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Patients
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => {
                const SpecialtyIcon = doctor.specialtyIcon;
                return (
                  <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {doctor.image}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                          <div className="flex items-center space-x-2">
                            <SpecialtyIcon className="w-4 h-4 text-teal-600" />
                            <p className="text-sm text-teal-600">{doctor.specialty}</p>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500">{doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{doctor.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{doctor.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doctor.experience} years</p>
                        <p className="text-sm text-gray-500">{doctor.qualification}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{doctor.patientsCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(doctor.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          doctor.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                        }`}
                      >
                        {doctor.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openModal('view', doctor)}
                          className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal('edit', doctor)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Doctor"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doctor.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Doctor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No doctors found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'add' && 'Add New Doctor'}
                {modalMode === 'edit' && 'Edit Doctor'}
                {modalMode === 'view' && 'Doctor Details'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {modalMode === 'view' ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {selectedDoctor?.image}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedDoctor?.name}</h3>
                      <p className="text-teal-600 font-medium">{selectedDoctor?.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{selectedDoctor?.rating} Rating</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{selectedDoctor?.patientsCount} Patients</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{selectedDoctor?.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{selectedDoctor?.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{selectedDoctor?.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Professional Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Experience:</span>
                          <span className="text-sm font-medium">{selectedDoctor?.experience} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Qualification:</span>
                          <span className="text-sm font-medium">{selectedDoctor?.qualification}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Consultation Fee:</span>
                          <span className="text-sm font-medium">Rs. {selectedDoctor?.consultationFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Join Date:</span>
                          <span className="text-sm font-medium">{selectedDoctor?.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Biography</h4>
                    <p className="text-sm text-gray-600">{selectedDoctor?.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Working Hours</h4>
                    <p className="text-sm text-gray-600">{selectedDoctor?.workingHours}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Dr. John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialty *
                      </label>
                      <select
                        required
                        value={formData.specialty}
                        onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        {specialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="doctor@hospital.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="+94 11 234 5678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience (years) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        max="50"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Qualification *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.qualification}
                        onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="MBBS, MD"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Main Building - Floor 1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Consultation Fee (Rs.) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.consultationFee}
                        onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="3000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Working Hours *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.workingHours}
                      onChange={(e) => setFormData({...formData, workingHours: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Mon-Fri: 9:00 AM - 5:00 PM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biography
                    </label>
                    <textarea
                      rows="4"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Brief description about the doctor's expertise and experience..."
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{modalMode === 'add' ? 'Add Doctor' : 'Save Changes'}</span>
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
}

