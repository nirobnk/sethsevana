import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, Stethoscope } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatusMessage("");

    if (!formData.email || !formData.password) {
      setError("Please enter both your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      const responseMessage = data?.message ?? "Login successful";
      if (responseMessage.toLowerCase().includes("success")) {
        if (typeof window !== "undefined") {
          if (data?.email) {
            localStorage.setItem("userEmail", data.email);
          }
          if (data?.patientId) {
            localStorage.setItem("userId", String(data.patientId));
          }
        }

        setStatusMessage("Login successful! Redirecting to your dashboard...");
        navigate("/dashboard", { replace: true });
        return;
      }

      setError(responseMessage || "Invalid credentials. Please try again.");
    } catch (errorResponse) {
      const message =
        errorResponse.response?.data?.message ??
        "Unable to sign in at the moment. Please try again later.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen pt-16">
      <div
        className="relative hidden flex-1 items-center justify-start bg-cover bg-center bg-no-repeat p-6 lg:flex"
        style={{ backgroundImage: "url('./doctor1rem.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-800/60 to-transparent" />
        <div className="relative z-10 mt-12 max-w-xl text-left">
          <p className="text-4xl font-bold leading-tight tracking-wide text-white/95 drop-shadow-lg xl:text-6xl">
            Meet Your Doctor!
          </p>
          <p className="mt-8 text-lg leading-relaxed text-white/95 drop-shadow-sm xl:text-xl">
            Professional healthcare management at your fingertips. Schedule appointments, manage prescriptions, and access your
            <span className="mx-1 inline-block animate-bounce font-semibold text-[#D72C2C]">medical</span>
            records securely.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-transparent to-cyan-800/60 p-4">
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg">
              <Stethoscope className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Seth Sevana</h1>
            <p className="mt-2 text-sm text-teal-700">Your trusted healthcare companion</p>
          </div>

          <div className="rounded-xl border border-teal-100 bg-white/95 p-6 shadow-2xl backdrop-blur-lg">
            <h2 className="text-center text-xl font-semibold text-gray-800">Sign In to Your Account</h2>
            <p className="mt-1 text-center text-sm text-gray-600">Access your medical dashboard securely</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-500" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    className="h-11 w-full rounded-lg border border-teal-200 bg-white pl-10 pr-3 text-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-500" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your secure password"
                    autoComplete="current-password"
                    className="h-11 w-full rounded-lg border border-teal-200 bg-white pl-10 pr-10 text-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 transition-colors hover:text-teal-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {(error || statusMessage) && (
                <div className="rounded-lg border border-transparent px-4 py-3 text-sm" aria-live="polite">
                  {error && <p className="text-red-600">{error}</p>}
                  {statusMessage && <p className="text-emerald-600">{statusMessage}</p>}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Access My Dashboard"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-700">
                Register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
