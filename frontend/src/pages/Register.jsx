import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Stethoscope,
  Phone,
  User,
  Calendar,
} from "lucide-react";

export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
    email: "",
    password: "",
  });

  const API_URL = "http://localhost:8080/api/patients/register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData);
      console.log("User registered:", response.data);
      alert("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        age: "",
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex pt-10">
      {/* Right Side - Doctor Image */}
      <div
        className="hidden lg:flex flex-[0.6] relative bg-cover bg-center bg-no-repeat items-center justify-start p-4"
        style={{ backgroundImage: "url('./doctor1rem.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-800/60 to-transparent"></div>
        <div className="relative z-10 text-left mt-10 max-w-md ml-6">
          <p className="text-3xl xl:text-5xl font-bold text-white/95 mb-4 tracking-wide drop-shadow-lg leading-tight">
            Join Seth Sevana!
          </p>
          <p className="text-base xl:text-lg text-white/95 mt-6 leading-relaxed drop-shadow-sm">
            Create your account to{" "}
            <span className="text-[#D72C2C] font-bold animate-bounce inline-block ">
              access
            </span>{" "}
            your healthcare services and manage appointments with ease.
          </p>
        </div>
      </div>

      {/* Left Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-transparent to-cyan-800/60">
        <div className="w-full max-w-md lg:max-w-lg">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center shadow-md mb-3">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Create Your Account
            </h1>
            <p className="mt-1 text-sm text-teal-700">
              Register to access healthcare services
            </p>
          </div>

          {/* Register Card */}
          <div className="border border-teal-100 shadow-xl bg-white/95 backdrop-blur-lg rounded-xl p-5 max-h-[85vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-teal-500" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full pl-10 pr-3 bg-white border border-teal-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 h-10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-teal-500" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full pl-10 pr-3 bg-white border border-teal-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 h-10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-4 w-4 text-teal-500" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-3 bg-white border border-teal-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 h-10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Age
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-teal-500" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className="w-full pl-10 pr-3 bg-white border border-teal-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 h-10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-teal-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 bg-white border border-teal-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 h-10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-teal-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter a secure password"
                    className="w-full pl-10 pr-10 bg-white border border-teal-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 h-10 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-teal-500 hover:text-teal-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold h-11 sm:h-12 text-base shadow-lg rounded-lg transform hover:scale-[1.02] transition-all"
              >
                Create Account
              </button>

              {/* Already have account */}
              <p className="text-center text-gray-600 text-sm mt-3">
                Already have an account?{" "}
                <span
                  className="text-teal-600 font-medium hover:underline cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Login here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
