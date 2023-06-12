import axios from "axios";
import configService from "../config/config.service";

export default async function getSuggestionLimit(
  lat: string,
  lon: string
): Promise<number> {
  try {
    const limit = await axios.get(
      `${configService.get(
        "OPENTRIP_STATIC_URL"
      )}/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&format=count&apikey=${configService.get(
        "OPENTRIP_API_KEY"
      )}`
    );

    return limit.data.count;
  } catch {
    throw new Error();
  }
}
