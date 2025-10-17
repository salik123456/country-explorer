import React, { useEffect, useMemo, useState } from "react";
import { useCountryStore } from "../store/countryStore";
import CountryCard from "../components/CountryCard";
import { useTheme } from "../context/ThemeContext";

const Dashboard: React.FC = () => {
  const {
    countryList,
    loadCountries,
    loading,
    error,
    page,
    perPage,
    setPage,
    toggleFavorite,
    favorites,
  } = useCountryStore();

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    loadCountries();
  }, []);

  const filtered = useMemo(() => {
    let list = countryList || [];

    if (search.trim()) {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region.trim()) {
      list = list.filter((c) => c.region === region);
    }

    return list;
  }, [countryList, search, region]);

  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } p-6`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1
          className={`text-3xl font-bold ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          🌍 Explore Countries
        </h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`p-2 pl-4 rounded-lg shadow-sm focus:ring-2 flex-1 sm:w-64 outline-none transition ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700 text-gray-200 focus:ring-blue-400"
                : "bg-white border border-gray-300 text-gray-800 focus:ring-blue-500"
            }`}
          />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={`p-2 rounded-lg shadow-sm focus:ring-2 transition ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700 text-gray-200 focus:ring-blue-400"
                : "bg-white border border-gray-300 text-gray-800 focus:ring-blue-500"
            }`}
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div
          className={`text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Loading countries...
        </div>
      )}
      {error && (
        <div
          className={`text-center ${
            theme === "dark" ? "text-red-400" : "text-red-600"
          }`}
        >
          {error}
        </div>
      )}
      {!loading && !error && paged.length === 0 && (
        <div
          className={`text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          No countries found.
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {paged.map((c) => (
          <CountryCard
            key={c.cca3}
            country={c}
            onToggle={() => toggleFavorite(c.cca3)}
            isFav={favorites.includes(c.cca3)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg border transition-all ${
            page <= 1
              ? "opacity-50 cursor-not-allowed"
              : theme === "dark"
              ? "border-gray-600 hover:bg-blue-600 hover:text-white"
              : "border-gray-300 hover:bg-blue-600 hover:text-white"
          }`}
        >
          ⬅ Prev
        </button>

        <div
          className={`font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Page {page}
        </div>

        <button
          disabled={start + perPage >= filtered.length}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg border transition-all ${
            start + perPage >= filtered.length
              ? "opacity-50 cursor-not-allowed"
              : theme === "dark"
              ? "border-gray-600 hover:bg-blue-600 hover:text-white"
              : "border-gray-300 hover:bg-blue-600 hover:text-white"
          }`}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
