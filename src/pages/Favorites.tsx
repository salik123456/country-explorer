import React from "react";
import { useCountryStore } from "../store/countryStore";
import CountryCard from "../components/CountryCard";
import { useTheme } from "../context/ThemeContext";

const Favorites: React.FC = () => {
  const { favorites, countryList, toggleFavorite } = useCountryStore();
  const { theme } = useTheme();

  const favCountries = countryList.filter((c: any) =>
    favorites.includes(c.cca3)
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } p-6`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl font-bold mb-6 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          ⭐ Favorites
        </h2>

        {favCountries.length === 0 ? (
          <div
            className={`text-center mt-10 text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            You haven’t added any favorite countries yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favCountries.map((c: any) => (
              <CountryCard
                key={c.cca3}
                country={c}
                onToggle={() => toggleFavorite(c.cca3)}
                isFav={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
