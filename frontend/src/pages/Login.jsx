import{ useState } from "react";
import axios from "axios";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Stethoscope,
  Heart,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      if (res.data.message === "Login successful") {
      alert("Login successful!");
      console.log(res.data);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("userId", res.data.patientId);

        navigate("/profile");
        
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex pt-14">
      {/* Right Side - Doctor Image & Animated Text */}
      <div
        className="hidden lg:flex flex-1 relative bg-cover bg-center bg-no-repeat items-center justify-start p-6 xl:p-8"
        style={{ backgroundImage: "url('./doctor1rem.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-800/60 to-transparent"></div>
        <div className="relative z-10 text-left mt-20 max-w-lg xl:max-w-xl ml-6 xl:ml-12">
          <p className="text-4xl xl:text-6xl font-bold text-white/95 mb-4 xl:mb-6 tracking-wide drop-shadow-lg leading-tight">
            Meet Your Doctor!
          </p>
          <p className="text-lg xl:text-xl text-white/95 mt-11 mb-6 xl:mb-8 leading-relaxed drop-shadow-sm">
            Professional healthcare management at your fingertips. Schedule
            appointments, manage prescriptions, and access your{" "}
            <span className="text-[#D72C2C] font-bold animate-bounce inline-block ">
              medical
            </span>{" "}
            records securely.
          </p>
        </div>
      </div>

      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-transparent to-cyan-800/60">
        <div className="w-full max-w-md lg:max-w-lg">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto h-14 w-14 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg mb-4">
              <Stethoscope className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800">
              Welcome to Seth Sevana
            </h1>
            <p className="mt-2 text-teal-700">
              Your trusted healthcare companion
            </p>
          </div>

          {/* Login Card */}
          <div className="border border-teal-100 shadow-2xl bg-white/95 backdrop-blur-lg rounded-xl p-6 ">
            <h2 className="text-xl text-center text-gray-800 font-bold mb-2">
              Sign In to Your Account
            </h2>
            <p className="text-center text-gray-600 text-sm mb-6">
              Access your medical dashboard securely
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-teal-500" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-3 bg-white border border-teal-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 h-11 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-teal-500" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your secure password"
                    className="w-full pl-10 pr-10 bg-white border border-teal-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 h-11 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-teal-500 hover:text-teal-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold h-11 sm:h-12 text-base shadow-lg rounded-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                Access My Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
