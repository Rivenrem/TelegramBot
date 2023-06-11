import { ISuggestion } from "../interfaces/suggestion.interface";
import getRandomNumber from "./getRandomNumber";
import getSityCoordinates from "../api/getCityCoordinates";
import getSuggestionLimit from "../api/getSuggestionLimit";
import getSuggestedPlace from "../api/getSuggestedPlace";

export default async function getSuggestion(
  city: string
): Promise<ISuggestion> {
  try {
    const [lat, lon] = await getSityCoordinates(city);

    const limit = await getSuggestionLimit(lat, lon);

    const suggestedPlace = await getSuggestedPlace(lat, lon, limit);

    return suggestedPlace.data[getRandomNumber(Math.min(limit, 500))];
  } catch {
    throw new Error();
  }
}
