import { ISuggestion } from '#types/types.d.ts';
import getRandomNumber from '#helpers/getRandomNumber.ts';
import getSityCoordinates from '#api/getCityCoordinates.ts';
import getSuggestionLimit from '#api/getSuggestionLimit.ts';
import getSuggestedPlace from '#api/getSuggestedPlace.ts';
import getInfoAboutSuggestion from '#api/getInfoAboutSuggestion.ts';

export default async function getSuggestion(
    city: string,
): Promise<ISuggestion> {
    try {
        const [lat, lon] = await getSityCoordinates(city);

        const limit = await getSuggestionLimit(lat, lon);

        const suggestedPlace = await getSuggestedPlace(lat, lon, limit);

        const currentXid =
            suggestedPlace.data[getRandomNumber(Math.min(limit, 500))].xid;

        const suggestedPlaceInfo = await getInfoAboutSuggestion(currentXid);

        return suggestedPlaceInfo.data;
    } catch {
        throw new Error();
    }
}
