import axios, {AxiosResponse} from "axios";
import configService from "../config/config.service";

export default async function getInfoAboutSuggestion(
  xid: string
): Promise<AxiosResponse> {
  const placeDescription = await axios.get(
    `${configService.get(
      "OPENTRIP_STATIC_URL"
    )}/0.1/en/places/xid/${xid}?apikey=${configService.get("OPENTRIP_API_KEY")}`
  );
  return placeDescription;
}
