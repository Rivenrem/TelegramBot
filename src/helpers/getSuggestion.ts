import { api } from 'Api/index';
import { AxiosResponse } from 'axios';
import { constants } from 'Constants/index';
import { getRandomNumber } from 'Helpers/getRandomNumber';
import { IPlace, ISuggestion } from 'Types/suggestion';

export async function getSuggestion(city: string): Promise<IPlace> {
    try {
        const [lat, lon] = await api.getCityCoordinates(city);

        const limit = await api.getSuggestionLimit(lat, lon);

        const suggestedPlace: ISuggestion = await api.getSuggestedPlace(
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

        const suggestedPlaceInfo: AxiosResponse =
            await api.getInfoAboutSuggestion(currentXid);

        return suggestedPlaceInfo.data as IPlace;
    } catch {
        throw new Error();
    }
}
