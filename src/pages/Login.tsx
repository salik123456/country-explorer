import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol");
  const { login, loading, error } = useAuthStore();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      if (token) {
        toast.success("Logged in successfully! 🎉");
        navigate("/");
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error || err.message || "Login failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl p-8 text-center space-y-6 ${
          theme === "dark"
            ? "bg-gray-800 border border-gray-700"
            : "bg-white/10 backdrop-blur-lg border border-white/20"
        }`}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome Back 👋
        </h1>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-200"
          }`}
        >
          Log in to continue exploring
        </p>

        {error && (
          <div className="text-red-200 bg-red-500/20 border border-red-400/30 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg border transition focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-indigo-400"
                  : "bg-white/10 text-white placeholder-gray-300 border-white/20 focus:ring-white/50"
              }`}
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className={`w-full p-3 rounded-lg border transition focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-indigo-400"
                  : "bg-white/10 text-white placeholder-gray-300 border-white/20 focus:ring-white/50"
              }`}
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg transition duration-200 ${
              theme === "dark"
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-white text-indigo-600 hover:bg-gray-100"
            } disabled:opacity-60`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-200"
          }`}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            className={`font-semibold underline ${
              theme === "dark"
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-white hover:text-gray-100"
            }`}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
