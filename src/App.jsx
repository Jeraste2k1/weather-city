import React, { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      const response = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.");
      }
      const weatherData = await response.json();
      setCurrentWeather({ city: searchData.label, ...weatherData });
      setError(null);
    } catch (err) {
      console.error("Erreur :", err);
      setError("Impossible de récupérer les données météo. Veuillez réessayer.");
      setCurrentWeather(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-80  bg-gradient-to-br from-blue-500 to-purple-700  rounded-3xl shadow-lg p-6 relative">
        {/* Search Bar */}
        <Search onSearchChange={handleOnSearchChange} />

        {/* Weather Info */}
        {currentWeather && <CurrentWeather weather={currentWeather} />}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default App;
