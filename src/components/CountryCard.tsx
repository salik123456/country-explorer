import React from "react";
import { Link } from "react-router-dom";
import type { Country } from "../store/countryStore";
import { useTheme } from "../context/ThemeContext";

interface CountryCardProps {
  country: Country;
  onToggle: () => void;
  isFav: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onToggle,
  isFav,
}) => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div
      className={`shadow-md hover:shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:-translate-y-1 border ${
        isDark
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <img
        src={country.flags.png}
        alt={country.flags.alt || `${country.name} flag`}
        className="h-44 w-full object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3
            className={`font-bold text-lg mb-1 ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {country.name}
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Region: {country.region}
          </p>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <Link
            to={`/country/${country.cca3}`}
            className={`text-sm px-3 py-1.5 rounded-md border transition ${
              isDark
                ? "bg-blue-900 border-blue-700 text-blue-300 hover:bg-blue-800"
                : "bg-blue-50 border-blue-400 text-blue-600 hover:bg-blue-100"
            }`}
          >
            View
          </Link>
          <button
            onClick={onToggle}
            className={`text-sm px-3 py-1.5 rounded-md border transition ${
              isFav
                ? isDark
                  ? "bg-yellow-800 border-yellow-600 text-yellow-300 hover:bg-yellow-700"
                  : "bg-yellow-100 border-yellow-400 text-yellow-700 hover:bg-yellow-200"
                : isDark
                ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {isFav ? "★ Fav" : "☆ Fav"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
