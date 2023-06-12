import axios, { AxiosResponse } from "axios";
import configService from "../config/config.service";

export default async function getSuggestedPlace(
  lat: string,
  lon: string,
  limit: number
): Promise<AxiosResponse> {
  try {
    const suggestedPlace = await axios.get(
      `${configService.get(
        "OPENTRIP_STATIC_URL"
      )}/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&format=json&limit=${limit}&apikey=${configService.get(
        "OPENTRIP_API_KEY"
      )}`
    );

    return suggestedPlace;
  } catch {
    throw new Error();
  }
}
