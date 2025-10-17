import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100 border-gray-700"
            : "bg-white text-gray-900 border-gray-200"
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / App Title */}
        <Link
          to="/"
          className="text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-2 hover:opacity-80 transition"
        >
          🌍 <span>Country Explorer</span>
        </Link>

        {/* Right Section (Favorites + Theme Toggle) */}
        <div className="flex items-center gap-3">
          {/* Favorites Icon */}
          <Link
            to="/favorites"
            aria-label="Favorites"
            className={`p-2 rounded-full border transition-all duration-300 hover:scale-105 ${
              location.pathname === "/favorites"
                ? theme === "dark"
                  ? "bg-gray-800 text-red-400 border-gray-600"
                  : "bg-gray-100 text-red-500 border-gray-300"
                : theme === "dark"
                ? "border-gray-600 hover:bg-gray-800 text-gray-300 hover:text-red-400"
                : "border-gray-300 hover:bg-gray-100 text-gray-700 hover:text-red-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full border transition-all duration-300 hover:scale-105
              ${
                theme === "dark"
                  ? "border-gray-600 hover:bg-gray-800 text-yellow-400"
                  : "border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
          >
            {theme === "dark" ? (
              // ☀️ Light Mode Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zm0 12a4 4 0 100-8 4 4 0 000 8zM4.22 5.22a.75.75 0 011.06 0l.75.75a.75.75 0 01-1.06 1.06l-.75-.75a.75.75 0 010-1.06zm9.76 9.76a.75.75 0 011.06 0l.75.75a.75.75 0 11-1.06 1.06l-.75-.75a.75.75 0 010-1.06zM2.75 10a.75.75 0 01.75-.75H4a.75.75 0 010 1.5H3.5a.75.75 0 01-.75-.75zm12.25-.75a.75.75 0 010 1.5h-.75a.75.75 0 010-1.5h.75zm-10 6.53a.75.75 0 011.06 0l.75.75a.75.75 0 01-1.06 1.06l-.75-.75a.75.75 0 010-1.06zM14.97 4.22a.75.75 0 011.06 0l.75.75a.75.75 0 01-1.06 1.06l-.75-.75a.75.75 0 010-1.06z" />
              </svg>
            ) : (
              // 🌙 Dark Mode Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293a8 8 0 11-10.586-10.586 8.002 8.002 0 0010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
