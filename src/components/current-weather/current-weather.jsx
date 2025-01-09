import React from "react";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather w-72 rounded-lg shadow-lg text-white bg-gray-800 mx-auto my-5 p-5">
      {/* Section Top */}
      <div className="top flex justify-between items-center">
        <div>
          <p className="city font-semibold text-lg leading-none tracking-wide m-0">{data.city}</p>
          <p className="weather-description font-normal text-sm leading-none m-0">
            {data.weather[0].description}
          </p>
        </div>
        <img
          alt="weather"
          className="weather-icon w-24"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>

      {/* Section Bottom */}
      <div className="bottom">
        <p className="temperature font-semibold text-6xl tracking-tighter my-3">
          {Math.round(data.main.temp)}°C
        </p>
        <div className="details w-full pl-5">
          <div className="parameter-row flex justify-between">
            <span className="parameter-label font-normal text-xs text-left">Détails météo</span>
          </div>
          <div className="parameter-row flex justify-between">
            <span className="parameter-label font-normal text-xs text-left">Température ressentie</span>
            <span className="parameter-value font-semibold text-xs text-right">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row flex justify-between">
            <span className="parameter-label font-normal text-xs text-left">Vitesse du vent</span>
            <span className="parameter-value font-semibold text-xs text-right">
              {data.wind.speed} m/s
            </span>
          </div>
          <div className="parameter-row flex justify-between">
            <span className="parameter-label font-normal text-xs text-left">Taux d'humidité</span>
            <span className="parameter-value font-semibold text-xs text-right">
              {data.main.humidity}%
            </span>
          </div>
          <div className="parameter-row flex justify-between">
            <span className="parameter-label font-normal text-xs text-left">Pression atmosphérique</span>
            <span className="parameter-value font-semibold text-xs text-right">
              {data.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
