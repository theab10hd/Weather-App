import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function WeatherBox({ setAtmosphere, setDay }) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [city, setCity] = useState("Kochi");
  const [weather, setWeather] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const getCityWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json/forecast.json?key=${API_KEY}&q=${city}`
      );
      setAtmosphere(response.data.current.condition.text);
      setDay(response.data.current.is_day);
      setWeather(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
      setIsLoaded(false);
    }
  };
  useEffect(() => {
    setIsLoaded(false);
    getCityWeather();
  }, [city]);
  return (
    <div className="md:w-100 md:h-7/12 h-full w-screen md:backdrop-blur-4xl backdrop-blur-xl shadow-2xl md:rounded-3xl p-3 md:border-1 border-gray-500 ">
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center bg-white rounded-full text-black px-4 py-2 focus:outline-0">
          <input
            type="text"
            placeholder="Search City"
            className="flex-grow bg-transparent focus:outline-none"
            onChange={(e) => setCity(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
        </div>

        <div className="h-1/2 flex flex-col items-center justify-center">
          {isLoaded ? (
            <>
              <p className="text-gray-100">
                {isLoaded ? (
                  <>
                    {weather.location.name}, {weather.location.region}
                  </>
                ) : null}
              </p>
              <div className="flex">
                <h1 className="font-bold text-9xl text-white">
                  {isLoaded ? weather.current.temp_c : "0"}
                </h1>
                <div className="flex flex-col justify-between py-3">
                  <p className="text-white text-2xl">°C</p>
                  <p className="text-gray-100 text-1xl">
                    {isLoaded ? weather.current.temp_f : 0}°F
                  </p>
                </div>
              </div>
              <p className="text-gray-200 text-xs">
                Last Updated : {isLoaded ? weather.current.last_updated : null}
              </p>
            </>
          ) : (
            <>
              <CircularProgress size="3rem" sx={{ color: "white" }} />
            </>
          )}
        </div>

        <div className="rounded-3xl  h-1/2 ">
          <div className="text-gray-100 text-center">
            {isLoaded ? (
              <>
                <div className="flex justify-evenly items-center">
                  <div className="flex items-center">
                    <img
                      src={weather.current.condition.icon}
                      className="w-12"
                    />
                    {weather.current.condition.text}
                  </div>{" "}
                  |<div> Humidity {weather.current.humidity}%</div> |{" "}
                  <div>{weather.current.is_day == 0 ? "Night" : "Day"}</div>
                </div>
                <div>
                  <p className="font-bold">
                    Feels Like {weather.current.feelslike_c} °C
                  </p>
                  <p className="text-sm">
                    {weather.current.feelslike_c > weather.current.temp_c
                      ? "Humidity Making Atmosphere Hotter"
                      : "Humidity Making Atmosphere Cooler"}
                  </p>
                </div>
                <hr className="mt-3 opacity-30" />
                <div>
                  <p className="text-center  mt-2">Forcast</p>
                  <div className="grid grid-cols-2 md:flex md:justify-between mt-2 gap-4">
                    <div className="flex flex-col items-center">
                      <p className="text-xs">Sunrise</p>
                      <p>{weather.forecast.forecastday[0].astro.sunrise}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-xs">Sunset</p>
                      <p>{weather.forecast.forecastday[0].astro.sunset}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-xs">Moonrise</p>
                      <p>{weather.forecast.forecastday[0].astro.moonrise}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-xs">Moonset</p>
                      <p>{weather.forecast.forecastday[0].astro.moonset}</p>
                    </div>
                  </div>
                  <div className="flex justify-evenly md:mt-2 mt-4">
                    <p>
                      UV index {weather.forecast.forecastday[0].day.uv}{" "}
                      {(() => {
                        const uv = weather.forecast.forecastday[0].day.uv;
                        if (uv < 3) return "Low";
                        else if (uv < 6) return "Moderate";
                        else if (uv < 8) return "High";
                        else if (uv < 11) return "Very High";
                        else return "Extreme";
                      })()}
                    </p>
                    <p>Wind Speed {weather.current.wind_kph} KPH</p>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherBox;
