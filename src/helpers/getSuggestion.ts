import axios from "axios";
import { ConfigService } from "../config/config.service";

const configService = new ConfigService();

export interface ISuggestion {
  xid: string;
  name: string;
  highlighted_name: string;
  kinds: string;
  wikidata: string;
}

export const getSuggestion = async (city: string): Promise<ISuggestion> => {
  const responseWithCoordinates = await axios.get(
    `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${configService.get(
      "OPENTRIP_API_KEY"
    )}`
  );

  if (responseWithCoordinates.data.status === "OK") {
    const lat = responseWithCoordinates.data.lat;
    const lon = responseWithCoordinates.data.lon;

    const limitResponse = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&format=count&apikey=${configService.get(
        "OPENTRIP_API_KEY"
      )}`
    );
    const limit = limitResponse.data.count;
    const randomNumber = Math.round(-0.5 + Math.random() * limit - 1);

    const placeResponse = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&format=json&limit=${limit}&apikey=${configService.get(
        "OPENTRIP_API_KEY"
      )}`
    );
    const place = placeResponse.data[randomNumber];
    return place;
  } else {
    throw new Error("Response error");
  }
};
