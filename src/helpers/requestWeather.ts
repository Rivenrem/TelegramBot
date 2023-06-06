import configService from "../config/config.service";
import axios from "axios";

export async function requestWeather(category: string) {
  const URL = `https://api.weatherapi.com/v1/current.json?key=${configService.get(
    "WEATHER_API_KEY"
  )}&q=${category}&aqi=no`;
  const responseData = (await axios.get(URL)).data;
  return responseData;
}
