import { AxiosResponse } from 'axios';

import getCityCoordinates from '../api/getCityCoordinates';
import getInfoAboutSuggestion from '../api/getInfoAboutSuggestion';
import getSuggestedPlace from '../api/getSuggestedPlace';
import getSuggestionLimit from '../api/getSuggestionLimit';
import constants from '../constants';
import { IPlace, ISuggestion } from '../types/suggestion';
import getRandomNumber from './getRandomNumber';

export default async function getSuggestion(city: string): Promise<IPlace> {
    try {
        const [lat, lon] = await getCityCoordinates(city);

        const limit = await getSuggestionLimit(lat, lon);

        const suggestedPlace: ISuggestion = await getSuggestedPlace(
            lat,
            lon,
            limit,
        );

        const currentXid: string =
            suggestedPlace.data[
                getRandomNumber(Math.min(limit, constants.responseLimin))
            ].xid;

        const suggestedPlaceInfo: AxiosResponse = await getInfoAboutSuggestion(
            currentXid,
        );

        return suggestedPlaceInfo.data as IPlace;
    } catch {
        throw new Error();
    }
}
