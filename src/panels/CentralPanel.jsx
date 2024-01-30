import { useEffect, useState } from "react";
import cloudImage from "../assets/cloud.svg";
import rainImage from "../assets/rain.svg";
import sunnyImage from "../assets/sunny.svg";
import stormImage from "../assets/storm.svg";

function CentralPanel({ currentCity }) {
  const [forecastData, setForecastData] = useState([]);
  const [forecastByDay, setForecastByDay] = useState([]);

  const weatherImages = {
    Clouds: cloudImage,
    Clear: sunnyImage,
    Rain: rainImage,
    Storm: stormImage,
    Fog: cloudImage,
    // add more as necessary
  };

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/weather/forecast/${currentCity}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (currentCity) {
      fetchForecast();
    }
  }, [currentCity]);

  useEffect(() => {
    const putForecastDataIntoDays = (forecastData) => {
      const newForecastByDay = [];

      if (forecastData && forecastData.list) {
        for (let i = 0; i < forecastData.list.length - 5; i += 3) {
          if (newForecastByDay.length < 15) {
            newForecastByDay.push(forecastData.list[i]);
          }
        }
      }

      return newForecastByDay;
    };

    setForecastByDay(putForecastDataIntoDays(forecastData));
  }, [forecastData]);

  // console.log("forecastByDay", forecastByDay);
  // console.log(
  //   "forecast.weather.main[1]?.main",
  //   forecastByDay[1]?.weather[0]?.main
  // );

  return (
    <div className="bg-blue-50 rounded-lg shadow font-bold text-gray-700">
      <div className="flex justify-center">
        <h1>Weather forecast</h1>
      </div>
      <div className="parent grid grid-cols-2 gap-4  m-2 p-6">
        {forecastByDay.map((forecast, index) => (
          <div
            className="child p-2 bg-blue-200 rounded-lg shadow font-bold hover:scale-105 transform text-gray-700 p-4"
            key={index}
          >
            <p>Time: {forecast.dt_txt} </p>
            <p>Temperature: {forecast.main.temp} °C</p>
            <p>Weather: {forecast.weather[0]?.main} </p>
            <p>Wind speed: {forecast.wind.speed} m/s </p>
            {forecast.weather[0] && (
              <img
                src={weatherImages[forecast.weather[0].main]}
                alt={forecast.weather[0].main}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CentralPanel;
