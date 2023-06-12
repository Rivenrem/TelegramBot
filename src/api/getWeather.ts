import configService from "../config/config.service";
import axios, { AxiosResponse } from "axios";

export default async function getWeather(
  category: string
): Promise<AxiosResponse> {
  try {
    const URL = `${configService.get(
      "WEATHER_STATIC_URL"
    )}/v1/current.json?key=${configService.get(
      "WEATHER_API_KEY"
    )}&q=${category}&aqi=no`;
    return axios.get(URL);
  } catch {
    throw new Error();
  }
}
