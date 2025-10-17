import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryByCode } from "../services/countriesApi";
import type { Country } from "../store/countryStore";
import { useTheme } from "../context/ThemeContext";

const CountryDetails: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    fetchCountryByCode(code)
      .then((res) => setCountry(res[0]))
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load country")
      )
      .finally(() => setLoading(false));
  }, [code]);

  if (loading)
    return (
      <div
        className={`flex items-center justify-center min-h-screen text-lg ${
          theme === "dark" ? "text-gray-300 bg-gray-900" : "text-gray-700 bg-gray-50"
        }`}
      >
        Loading country details...
      </div>
    );

  if (error)
    return (
      <div
        className={`flex items-center justify-center min-h-screen text-lg ${
          theme === "dark" ? "text-red-400 bg-gray-900" : "text-red-600 bg-gray-50"
        }`}
      >
        {error}
      </div>
    );

  if (!country)
    return (
      <div
        className={`flex items-center justify-center min-h-screen text-lg ${
          theme === "dark" ? "text-gray-400 bg-gray-900" : "text-gray-600 bg-gray-50"
        }`}
      >
        No country data available.
      </div>
    );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } p-6`}
    >
      <div
        className={`max-w-2xl mx-auto shadow-lg rounded-2xl p-6 transition-all duration-300 ${
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <Link
          to="/"
          className={`inline-flex items-center mb-4 font-medium transition ${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-800"
          }`}
        >
          <span className="mr-1 text-lg">←</span> Back
        </Link>

        <h1
          className={`text-3xl font-bold mb-4 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {country.name}
        </h1>

        <img
          src={country.flags.png}
          alt={country.flags.alt || `${country.name} flag`}
          className={`w-full max-w-md mx-auto rounded-lg shadow-sm border mb-6 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        />

        <p
          className={`text-lg mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <span className="font-semibold">Region:</span> {country.region}
        </p>

        {country.borders?.length ? (
          <div className="mt-6">
            <h3
              className={`font-semibold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Border countries:
            </h3>
            <div className="flex flex-wrap gap-2">
              {country.borders.map((b) => (
                <Link
                  key={b}
                  to={`/country/${b}`}
                  className={`px-3 py-1.5 rounded-md border text-sm transition ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-blue-300 hover:bg-gray-600"
                      : "bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  {b}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p
            className={`mt-4 italic ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No border countries
          </p>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
