import axios from "axios";
import configService from "../config/config.service";

export default async function getSityCoordinates(
  cityName: string
): Promise<string[]> {
  try {
    const coordinates = await axios.get(
      `${configService.get(
        "OPENTRIP_STATIC_URL"
      )}/0.1/en/places/geoname?name=${cityName}&apikey=${configService.get(
        "OPENTRIP_API_KEY"
      )}`
    );

    if (coordinates.data.status !== "OK") {
      throw new Error();
    }

    const lat = coordinates.data.lat;
    const lon = coordinates.data.lon;

    return [lat, lon];
  } catch {
    throw new Error();
  }
}
