



import React from "react";
import { Edit, User, Phone, Calendar, FileText, Heart, Shield, Pill } from "lucide-react";

export const ProfileSection = ({onEdit}) => {
  

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KVC Niluminda</h1>
              <p className="text-gray-600">Patient ID: P-2024-001</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Active Patient</span>
              </div>
            </div>
          </div>
          <button 
             onClick={onEdit}
            className="flex items-center space-x-2 bg-white text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-4 py-2 rounded-lg border border-teal-200 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Edit className="w-4 h-4" />
            <span className="font-medium">Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Main Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Full Name</span>
              <span className="font-medium text-gray-900">KVC Niluminda</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Date of Birth</span>
              <span className="font-medium text-gray-900">Nov 13, 2002</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Age</span>
              <span className="font-medium text-gray-900">21 years</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Gender</span>
              <span className="font-medium text-gray-900">Male</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">NIC Number</span>
              <span className="font-medium text-gray-900">20021400234</span>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Phone Number</span>
              <span className="font-medium text-gray-900">0743256782</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Email</span>
              <span className="font-medium text-gray-900">niluminda@email.com</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Address</span>
              <span className="font-medium text-gray-900 text-right">123 Main Street<br/>Colombo, Sri Lanka</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">Emergency Contact</span>
              <span className="font-medium text-gray-900">0771234567</span>
            </div>
          </div>
        </div>

        {/* Medical Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Blood Group</span>
              <span className="font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full text-sm">O+</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Height</span>
              <span className="font-medium text-gray-900">175 cm</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Weight</span>
              <span className="font-medium text-gray-900">70 kg</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">BMI</span>
              <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">22.9 (Normal)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Medical History and Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allergies and Conditions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Allergies & Conditions</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Known Allergies</p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-600 text-center italic">No known allergies</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Chronic Conditions</p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-600 text-center italic">No chronic conditions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Medications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Pill className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-center italic">No current medications</p>
            </div>
            <button className="w-full text-teal-600 hover:text-teal-700 hover:bg-teal-50 py-2 px-4 rounded-lg border border-teal-200 transition-colors duration-200">
              + Add Medication
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-teal-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Last Appointment</p>
                <p className="text-sm text-gray-500">Dr. Sarah Johnson - General Checkup</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Dec 15, 2023</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Health Record Updated</p>
                <p className="text-sm text-gray-500">Blood pressure measurement added</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Dec 10, 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}

