import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  Heart,
  Brain,
  Eye,
  Bone,
  Baby,
  Activity
} from "lucide-react";

export const BookAppointment=()=> {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [step, setStep] = useState(1);

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      experience: "15 years",
      location: "Main Building - Floor 3",
      phone: "+94 11 234 5678",
      image: "SJ",
      consultationFee: "Rs. 3,500",
      nextAvailable: "Today",
      specialtyIcon: Heart,
      color: "red"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology", 
      rating: 4.8,
      experience: "12 years",
      location: "Neuro Center - Floor 2",
      phone: "+94 11 234 5679",
      image: "MC",
      consultationFee: "Rs. 4,000",
      nextAvailable: "Tomorrow",
      specialtyIcon: Brain,
      color: "purple"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Ophthalmology",
      rating: 4.7,
      experience: "10 years", 
      location: "Eye Care Center - Floor 1",
      phone: "+94 11 234 5680",
      image: "ED",
      consultationFee: "Rs. 3,000",
      nextAvailable: "Today",
      specialtyIcon: Eye,
      color: "blue"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      rating: 4.9,
      experience: "18 years",
      location: "Orthopedic Wing - Floor 4", 
      phone: "+94 11 234 5681",
      image: "JW",
      consultationFee: "Rs. 3,800",
      nextAvailable: "Tomorrow",
      specialtyIcon: Bone,
      color: "orange"
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      specialty: "Pediatrics",
      rating: 4.8,
      experience: "8 years",
      location: "Children's Ward - Floor 2",
      phone: "+94 11 234 5682", 
      image: "LA",
      consultationFee: "Rs. 2,500",
      nextAvailable: "Today",
      specialtyIcon: Baby,
      color: "pink"
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      specialty: "General Medicine",
      rating: 4.6,
      experience: "14 years",
      location: "General Clinic - Floor 1",
      phone: "+94 11 234 5683",
      image: "RK", 
      consultationFee: "Rs. 2,800",
      nextAvailable: "Today",
      specialtyIcon: Activity,
      color: "green"
    }
  ];

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: Stethoscope },
    { id: 'cardiology', name: 'Cardiology', icon: Heart },
    { id: 'neurology', name: 'Neurology', icon: Brain },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: Eye },
    { id: 'orthopedics', name: 'Orthopedics', icon: Bone },
    { id: 'pediatrics', name: 'Pediatrics', icon: Baby },
    { id: 'general', name: 'General Medicine', icon: Activity }
  ];

  const appointmentTypes = [
    { id: 'consultation', name: 'General Consultation', duration: '30 min' },
    { id: 'followup', name: 'Follow-up Visit', duration: '20 min' },
    { id: 'emergency', name: 'Emergency Consultation', duration: '45 min' },
    { id: 'checkup', name: 'Routine Checkup', duration: '25 min' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty.toLowerCase() === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime && appointmentType) {
      setStep(3); // Success step
    }
  };

  const resetForm = () => {
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setAppointmentType('');
    setStep(1);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked Successfully!</h2>
          <p className="text-gray-600 mb-6">Your appointment has been confirmed. You will receive a confirmation email shortly.</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Appointment Details:</h3>
            <div className="space-y-2">
              <p><span className="text-gray-500">Doctor:</span> <span className="font-medium">{selectedDoctor.name}</span></p>
              <p><span className="text-gray-500">Specialty:</span> <span className="font-medium">{selectedDoctor.specialty}</span></p>
              <p><span className="text-gray-500">Date:</span> <span className="font-medium">{selectedDate}</span></p>
              <p><span className="text-gray-500">Time:</span> <span className="font-medium">{selectedTime}</span></p>
              <p><span className="text-gray-500">Type:</span> <span className="font-medium">{appointmentTypes.find(t => t.id === appointmentType)?.name}</span></p>
              <p><span className="text-gray-500">Location:</span> <span className="font-medium">{selectedDoctor.location}</span></p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={resetForm}
              className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Book Another Appointment
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              View My Appointments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book an Appointment</h1>
            <p className="text-gray-600">Choose your preferred doctor, date, and time</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="font-medium">Select Doctor</span>
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'} rounded`}></div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="font-medium">Book Appointment</span>
          </div>
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-200'} rounded`}></div>
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <>
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                >
                  {specialties.map(specialty => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Doctors List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map(doctor => {
              const SpecialtyIcon = doctor.specialtyIcon;
              return (
                <div
                  key={doctor.id}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setStep(2);
                  }}
                  className={`bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedDoctor?.id === doctor.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {doctor.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <SpecialtyIcon className={`w-4 h-4 text-${doctor.color}-600`} />
                          <span className={`text-${doctor.color}-600 font-medium`}>{doctor.specialty}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{doctor.experience} experience</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{doctor.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{doctor.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Consultation Fee</p>
                          <p className="font-bold text-lg text-gray-900">{doctor.consultationFee}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Next Available</p>
                          <p className={`font-medium ${doctor.nextAvailable === 'Today' ? 'text-green-600' : 'text-orange-600'}`}>
                            {doctor.nextAvailable}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {step === 2 && selectedDoctor && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Selected Doctor Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Selected Doctor</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {selectedDoctor.image}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{selectedDoctor.name}</p>
                  <p className="text-teal-600">{selectedDoctor.specialty}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience:</span>
                  <span className="font-medium">{selectedDoctor.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fee:</span>
                  <span className="font-medium">{selectedDoctor.consultationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium text-right">{selectedDoctor.location}</span>
                </div>
              </div>
              
              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Change Doctor
              </button>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Type */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Select Appointment Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointmentTypes.map(type => (
                  <div
                    key={type.id}
                    onClick={() => setAppointmentType(type.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      appointmentType === type.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <h4 className="font-medium text-gray-900">{type.name}</h4>
                    <p className="text-sm text-gray-500">{type.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Select Date</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Select Time</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTime === time
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-300 text-gray-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmation */}
            {selectedDate && selectedTime && appointmentType && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Please Review Your Appointment</h4>
                    <p className="text-sm text-gray-600">Make sure all details are correct before confirming.</p>
                  </div>
                </div>
                
                <button
                  onClick={handleBookAppointment}
                  className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  Confirm Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

