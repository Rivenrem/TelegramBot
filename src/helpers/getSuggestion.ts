import { ISuggestion } from '#types/types.d.ts';
import getRandomNumber from '#helpers/getRandomNumber.ts';
import getCityCoordinates from '#api/getCityCoordinates.ts';
import getSuggestionLimit from '#api/getSuggestionLimit.ts';
import getSuggestedPlace from '#api/getSuggestedPlace.ts';
import getInfoAboutSuggestion from '#api/getInfoAboutSuggestion.ts';
import constants from '#constants/index.ts';

export default async function getSuggestion(
    city: string,
): Promise<ISuggestion> {
    try {
        const [lat, lon] = await getCityCoordinates(city);

        const limit = await getSuggestionLimit(lat, lon);

        const suggestedPlace = await getSuggestedPlace(lat, lon, limit);

        const currentXid =
            suggestedPlace.data[
                getRandomNumber(Math.min(limit, constants.responseLimin))
            ].xid;

        const suggestedPlaceInfo = await getInfoAboutSuggestion(currentXid);

        return suggestedPlaceInfo.data;
    } catch {
        throw new Error();
    }
}
