import React from "react";

const CurrentWeather = ({ weather }) => {
  return (
    <div className="flex flex-col items-center mt-16">
      <img
        src={`icons/${weather.weather[0].icon}.png`}
        alt="weather icon"
        className="w-20 h-20 mb-4"
      />
      <p className="text-5xl font-bold text-white">
        {Math.round(weather.main.temp)}°C
      </p>
      <p className="text-lg text-white mt-2">{weather.city}</p>
      <div className="flex justify-between w-full mt-6 text-sm text-white">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mb-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 15.33A4.58 4.58 0 0118 14.7M4 12h16M3.27 7.27a4.6 4.6 0 017.47-3.52M3.46 16.46A4.6 4.6 0 0012 18a4.6 4.6 0 008.54-1.54M7 20h10"
            />
          </svg>
          <p>Humidité</p>
          <p>{weather.main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mb-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.929 4.929l14.142 14.142M19.071 4.929L4.929 19.071M3 12h18"
            />
          </svg>
          <p>Vitesse du vent</p>
          <p>{weather.wind.speed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
