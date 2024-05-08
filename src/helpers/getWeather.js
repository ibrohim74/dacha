import { WEATHER_BASE_URL } from "../processes/utils/consts";

const apiKey = "21c332391c804785aa885105240605";

export async function getWeather(latitude, longitude) {
  //   const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

  // WEATHER_BASE_URL = "http://api.weatherapi.com/v1/current.json";

  const url = `${WEATHER_BASE_URL}?key=${apiKey}&q=${latitude},${longitude}`;

  // http://api.weatherapi.com/v1/current.json??key=21c332391c804785aa885105240605&q=41.3138944,69.3141504

  // http://api.weatherapi.com/v1/current.json?key=21c332391c804785aa885105240605&q=41.2994958,69.2400734

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
