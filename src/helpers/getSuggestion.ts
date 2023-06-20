import { getCityCoordinates } from 'Api/getCityCoordinates';
import { getInfoAboutSuggestion } from 'Api/getInfoAboutSuggestion';
import { getSuggestedPlace } from 'Api/getSuggestedPlace';
import { getSuggestionLimit } from 'Api/getSuggestionLimit';
import { AxiosResponse } from 'axios';
import { constants } from 'Constants/index';
import { getRandomNumber } from 'Helpers/getRandomNumber';
import { IPlace, ISuggestion } from 'Types/suggestion';

export async function getSuggestion(city: string): Promise<IPlace> {
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
                getRandomNumber(
                    Math.min(limit, constants.Numbers.responseLimit),
                )
            ].xid;

        const suggestedPlaceInfo: AxiosResponse = await getInfoAboutSuggestion(
            currentXid,
        );

        return suggestedPlaceInfo.data as IPlace;
    } catch {
        throw new Error();
    }
}
