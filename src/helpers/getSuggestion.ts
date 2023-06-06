import axios from "axios";
import configService from "config/config.service";
import { ISuggestion } from "interfaces/suggestion.interface";

export default async function getSuggestion(
  city: string
): Promise<ISuggestion> {
  const responseWithCoordinates = await axios.get(
    `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${configService.get(
      "OPENTRIP_API_KEY"
    )}`
  );

  if (responseWithCoordinates.data.status !== "OK") {
    throw new Error("Response error");
  }

  const lat = responseWithCoordinates.data.lat;
  const lon = responseWithCoordinates.data.lon;

  const limitResponse = await axios.get(
    `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&format=count&apikey=${configService.get(
      "OPENTRIP_API_KEY"
    )}`
  );
  const limit = limitResponse.data.count;
  const randomNumber = Math.round(Math.random() * limit - 1.5);

  const placeResponse = await axios.get(
    `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&format=json&limit=${limit}&apikey=${configService.get(
      "OPENTRIP_API_KEY"
    )}`
  );

  return placeResponse.data[randomNumber];
}
