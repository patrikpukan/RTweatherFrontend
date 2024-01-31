import { useEffect, useState } from "react";
import cloudImage from "../assets/cloud.svg";
import rainImage from "../assets/rain.svg";
import sunnyImage from "../assets/sunny.svg";
import stormImage from "../assets/storm.svg";

function RightPanel({ currentCity }) {
  const [weatherData, setWeatherData] = useState([]);
  const [formattedWeatherData, setFormattedWeatherData] = useState({
    currentTemp: "",
    feelsLike: "",
    humidity: "",
    windSpeed: "",
    weather: "",
  });

  const weatherImages = {
    Clouds: cloudImage,
    Clear: sunnyImage,
    Rain: rainImage,
    Storm: stormImage,
    Fog: cloudImage,
    Mist: cloudImage,

    // add more as necessary
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/weather/${currentCity}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
        setFormattedWeatherData({
          currentTemp: weatherData.main.temp,
          feelsLike: weatherData.main.feels_like,
          humidity: weatherData.main.humidity,
          windSpeed: weatherData.wind.speed,
          weather: weatherData.weather[0].main,
        });
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (currentCity) {
      fetchWeather();
    }
  }, [currentCity]);

  useEffect(() => {
    const formatWeather = (weatherData) => {
      setFormattedWeatherData({
        currentTemp: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        weather: weatherData.weather[0].main,
      });
    };

    if (
      currentCity &&
      weatherData &&
      weatherData.main &&
      weatherData.wind &&
      weatherData.weather
    ) {
      formatWeather(weatherData);
    }
  }, [currentCity, weatherData]);

  // console.log("current city:", currentCity);
  // console.log("weather data:", weatherData);
  // console.log("formatted weather data:", formattedWeatherData);

  return (
    <div className="bg-blue-50 rounded-lg shadow font-bold text-gray-700">
      <div className="flex justify-center">
        <h1>Current weather</h1>
      </div>
      <div className="gap-4  rounded-lg  font-bold text-gray-700 m-2 p-6">
        <div className="bg-blue-200 rounded-lg shadow font-bold hover:scale-105 transform text-gray-700 p-4">
          <p className="text-2xl">
            Current temperature: {formattedWeatherData.currentTemp} °C
          </p>
          <p className="text-2xl">
            Feels like: {formattedWeatherData.feelsLike} °C
          </p>
          <p className="text-2xl">
            Humidity: {formattedWeatherData.humidity} %
          </p>
          <p className="text-2xl">
            Wind speed: {formattedWeatherData.windSpeed} m/s
          </p>
          <p className="text-2xl">Weather: {formattedWeatherData.weather}</p>
          {formattedWeatherData.weather && (
            <img
              src={weatherImages[formattedWeatherData.weather]}
              alt={formattedWeatherData.weather}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
