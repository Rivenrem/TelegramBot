import axios, {AxiosResponse} from "axios";

export default async function getInfoAboutSuggestion(
  xid: string
): Promise<AxiosResponse> {
  const placeDescription = await axios.get(
    `${process.env.OPENTRIP_STATIC_URL}/0.1/en/places/xid/${xid}?apikey=${process.env.OPENTRIP_API_KEY}`
  );
  return placeDescription;
}