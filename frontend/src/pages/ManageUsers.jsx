
// import React, { useState } from "react";
// import { Search, Edit, Trash2, Eye, X, Save, Users, Mail, Phone, User } from "lucide-react";

// export const ManageUsers = () => {
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: "KVC Niluminda",
//       email: "niluminda@email.com",
//       phone: "0743256782",
//       nic: "20021400234",
//       dateOfBirth: "2002-11-13",
//       gender: "Male",
//       address: "123 Main Street, Colombo 07",
//       bloodGroup: "O+",
//       emergencyContact: "0771234567",
//       emergencyContactName: "Mother - Mrs. Niluminda",
//       registrationDate: "2023-01-15",
//       appointmentsCount: 12
//     },
//     {
//       id: 2,
//       name: "Sarah Fernando",
//       email: "sarah.fernando@email.com",
//       phone: "0712345678",
//       nic: "19951234567",
//       dateOfBirth: "1995-06-20",
//       gender: "Female",
//       address: "456 Oak Avenue, Kandy",
//       bloodGroup: "A+",
//       emergencyContact: "0723456789",
//       emergencyContactName: "Husband - Mr. Fernando",
//       registrationDate: "2023-03-22",
//       appointmentsCount: 8
//     },
//     {
//       id: 3,
//       name: "Rajesh Kumar",
//       email: "rajesh.kumar@email.com",
//       phone: "0776543210",
//       nic: "19801567890",
//       dateOfBirth: "1980-12-05",
//       gender: "Male",
//       address: "789 Park Road, Galle",
//       bloodGroup: "B-",
//       emergencyContact: "0754321098",
//       emergencyContactName: "Wife - Mrs. Kumar",
//       registrationDate: "2022-11-10",
//       appointmentsCount: 5
//     },
//     {
//       id: 4,
//       name: "Priya Jayasinghe",
//       email: "priya.jayasinghe@email.com",
//       phone: "0789876543",
//       nic: "19920987654",
//       dateOfBirth: "1992-08-14",
//       gender: "Female",
//       address: "321 Beach Road, Negombo",
//       bloodGroup: "AB+",
//       emergencyContact: "0765432109",
//       emergencyContactName: "Father - Mr. Jayasinghe",
//       registrationDate: "2023-07-08",
//       appointmentsCount: 15
//     }
//   ]);

 
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('view'); // 'edit', 'view'
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     nic: '',
//     dateOfBirth: '',
//     gender: 'Male',
//     address: '',
//     bloodGroup: 'O+',
//     emergencyContact: '',
//     emergencyContactName: ''
//   });

//   const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];


//   const openModal = (mode, user) => {
//     setModalMode(mode);
//     setSelectedUser(user);
//     if (mode === 'edit') {
//       setFormData({
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         nic: user.nic,
//         dateOfBirth: user.dateOfBirth,
//         gender: user.gender,
//         address: user.address,
//         bloodGroup: user.bloodGroup,
//         emergencyContact: user.emergencyContact,
//         emergencyContactName: user.emergencyContactName
//       });
//     }
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedUser(null);
//   };

//   const handleEdit = (e) => {
//     e.preventDefault();
//     setUsers(users.map(user => 
//       user.id === selectedUser.id 
//         ? { ...user, ...formData }
//         : user
//     ));
//     closeModal();
//   };

//   const handleDelete = (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsers(users.filter(user => user.id !== userId));
//     }
//   };

//   const calculateAge = (dateOfBirth) => {
//     const today = new Date();
//     const birthDate = new Date(dateOfBirth);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
//               <p className="text-gray-600">
//                 Add, edit, and manage patient information
//               </p>
//             </div>
//           </div>
          
//         </div>
//       </div>

      

//       {/* Users List */}
//       <div className="space-y-4">
//         {users.map((user) => (
//           <div key={user.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
//             {/* User Header */}
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold">
//                   {user.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
//                   <p className="text-sm text-gray-600">ID: {user.nic}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => openModal('view', user)}
//                   className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
//                   title="View Details"
//                 >
//                   <Eye className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => openModal('edit', user)}
//                   className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                   title="Edit User"
//                 >
//                   <Edit className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(user.id)}
//                   className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                   title="Delete User"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* User Info Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//               <div className="flex items-center space-x-2">
//                 <Mail className="w-4 h-4 text-gray-400" />
//                 <span className="text-gray-600">{user.email}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Phone className="w-4 h-4 text-gray-400" />
//                 <span className="text-gray-600">{user.phone}</span>
//               </div>
//               <div className="text-gray-600">
//                 <span className="font-medium">Age:</span> {calculateAge(user.dateOfBirth)} years
//               </div>
//               <div className="text-gray-600">
//                 <span className="font-medium">Gender:</span> {user.gender}
//               </div>
//               <div className="text-gray-600">
//                 <span className="font-medium">Blood Group:</span> <span className="text-red-600">{user.bloodGroup}</span>
//               </div>
//               <div className="text-gray-600">
//                 <span className="font-medium">Appointments:</span> {user.appointmentsCount}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

     

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900">
//                 {modalMode === 'edit' ? 'Edit User' : 'User Details'}
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             <div className="p-6">
//               {modalMode === 'view' ? (
//                 <div className="space-y-6">
//                   {/* User Profile Header */}
//                   <div className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
//                     <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
//                       {selectedUser?.name.split(' ').map(n => n[0]).join('')}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">{selectedUser?.name}</h3>
//                       <p className="text-gray-600">{selectedUser?.email}</p>
//                       <p className="text-sm text-gray-500">Patient ID: {selectedUser?.nic}</p>
//                     </div>
//                   </div>

//                   {/* User Details */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
//                       <div className="space-y-2 text-sm">
//                         <div><span className="text-gray-500">Full Name:</span> <span className="font-medium">{selectedUser?.name}</span></div>
//                         <div><span className="text-gray-500">Date of Birth:</span> <span className="font-medium">{selectedUser?.dateOfBirth}</span></div>
//                         <div><span className="text-gray-500">Age:</span> <span className="font-medium">{calculateAge(selectedUser?.dateOfBirth)} years</span></div>
//                         <div><span className="text-gray-500">Gender:</span> <span className="font-medium">{selectedUser?.gender}</span></div>
//                         <div><span className="text-gray-500">NIC:</span> <span className="font-medium">{selectedUser?.nic}</span></div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
//                       <div className="space-y-2 text-sm">
//                         <div><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedUser?.email}</span></div>
//                         <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{selectedUser?.phone}</span></div>
//                         <div><span className="text-gray-500">Address:</span> <span className="font-medium">{selectedUser?.address}</span></div>
//                         <div><span className="text-gray-500">Emergency Contact:</span> <span className="font-medium">{selectedUser?.emergencyContact}</span></div>
//                         <div><span className="text-gray-500">Emergency Person:</span> <span className="font-medium">{selectedUser?.emergencyContactName}</span></div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-semibold text-gray-900 mb-2">Medical & Activity Information</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                       <div><span className="text-gray-500">Blood Group:</span> <span className="font-medium text-red-600">{selectedUser?.bloodGroup}</span></div>
//                       <div><span className="text-gray-500">Registration:</span> <span className="font-medium">{selectedUser?.registrationDate}</span></div>
//                       <div><span className="text-gray-500">Appointments:</span> <span className="font-medium">{selectedUser?.appointmentsCount}</span></div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <form onSubmit={handleEdit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                       <input
//                         type="text"
//                         required
//                         value={formData.name}
//                         onChange={(e) => setFormData({...formData, name: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">NIC Number</label>
//                       <input
//                         type="text"
//                         required
//                         value={formData.nic}
//                         onChange={(e) => setFormData({...formData, nic: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                       <input
//                         type="email"
//                         required
//                         value={formData.email}
//                         onChange={(e) => setFormData({...formData, email: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                       <input
//                         type="tel"
//                         required
//                         value={formData.phone}
//                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
//                       <input
//                         type="date"
//                         required
//                         value={formData.dateOfBirth}
//                         onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                       <select
//                         required
//                         value={formData.gender}
//                         onChange={(e) => setFormData({...formData, gender: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       >
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
//                       <select
//                         required
//                         value={formData.bloodGroup}
//                         onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       >
//                         {bloodGroups.map(group => (
//                           <option key={group} value={group}>{group}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
//                       <input
//                         type="tel"
//                         required
//                         value={formData.emergencyContact}
//                         onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                     <textarea
//                       required
//                       rows="2"
//                       value={formData.address}
//                       onChange={(e) => setFormData({...formData, address: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.emergencyContactName}
//                       onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       placeholder="Mother - Mrs. Doe"
//                     />
//                   </div>

//                   <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="flex items-center space-x-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
//                     >
//                       <Save className="w-4 h-4" />
//                       <span>Save Changes</span>
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Users,
  Mail,
  Phone,
  User,
  Calendar,
  Heart,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

export const ManageUsers = () => {
  const [users, setUsers] = useState([
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
      status: "inactive",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "0776543210",
      nic: "19801567890",
      dateOfBirth: "1980-12-05",
      gender: "Male",
      address: "789 Park Road, Galle",
      bloodGroup: "B-",
      emergencyContact: "0754321098",
      emergencyContactName: "Wife - Mrs. Kumar",
      registrationDate: "2022-11-10",
      appointmentsCount: 5,
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const openModal = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const toggleStatus = (userId) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-600">Add, edit, and manage patient profiles</p>
          </div>
        </div>
        <button
          onClick={() => openModal("add")}
          className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.status === "active").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Inactive Users</p>
            <p className="text-2xl font-bold text-orange-600">
              {users.filter((u) => u.status === "inactive").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Appointments</p>
            <p className="text-2xl font-bold text-red-600">
              {users.reduce((sum, u) => sum + u.appointmentsCount, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
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

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Contact</th>
                <th className="px-6 py-4 text-left">Gender</th>
                <th className="px-6 py-4 text-left">Blood</th>
                <th className="px-6 py-4 text-left">Appointments</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 border-b transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span>{user.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{user.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.gender}</td>
                    <td className="px-6 py-4 text-red-600 font-medium">
                      {user.bloodGroup}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-center">
                      {user.appointmentsCount}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openModal("view", user)}
                        className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal("edit", user)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {modalMode === "add"
                ? "Add New User"
                : modalMode === "edit"
                ? "Edit User"
                : "View User"}
            </h2>
            <p className="text-gray-600">
              {modalMode === "view"
                ? `User: ${selectedUser?.name}`
                : "Form content goes here..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};