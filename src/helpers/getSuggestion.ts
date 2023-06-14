import { ISuggestion } from '../types/types';
import getRandomNumber from './getRandomNumber';
import getCityCoordinates from '../api/getCityCoordinates';
import getSuggestionLimit from '../api/getSuggestionLimit';
import getSuggestedPlace from '../api/getSuggestedPlace';
import getInfoAboutSuggestion from '../api/getInfoAboutSuggestion';

import constants from '../constants';

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
