import React, { useState } from "react";
import Search from "./components/search/search"
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL,WEATHER_API_KEY } from "./components/api";
// import "./App.css";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null); // Ajout d'un état pour gérer les erreurs

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      // Appels API pour la météo actuelle et les prévisions
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        fetch(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        ),
        fetch(
          `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        ),
      ]);

      // Vérification des réponses API
      if (!currentWeatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Erreur lors de la récupération des données.");
      }

      // Traitement des données JSON
      const weatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();

      // Mise à jour des états avec les données récupérées
      setCurrentWeather({ city: searchData.label, ...weatherData });
      setForecast({ city: searchData.label, ...forecastData });
      setError(null); // Réinitialiser l'erreur en cas de succès
    } catch (err) {
      console.error("Erreur :", err);
      setError("Impossible de récupérer les données météo. Veuillez réessayer.");
      setCurrentWeather(null); // Réinitialiser les données si erreur
      setForecast(null);
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold text-center mb-6">Weather Finder</h1>
      <Search onSearchChange={handleOnSearchChange} countryCode="BJ" />
      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )} {/* Affichage des erreurs */}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {/* {forecast && <Forecast data={forecast} />} */}
    </div>
  );
};

export default App;
