import axios, { AxiosResponse } from 'axios';
import { ISuggestionLimitData } from 'src/types/suggestion';

import { constants } from '../constants/index';

export async function getSuggestionLimit(
    lat: string,
    lon: string,
): Promise<number> {
    try {
        const limitResponse: AxiosResponse = await axios.get(
            `${constants.envVariables.OPENTRIP_STATIC_URL
      }/0.1/en/places/radius?radius=1000&lon=${lon
      }&lat=${lat
      }&format=count&apikey=${constants.envVariables.OPENTRIP_API_KEY}`, // prettier-ignore
        );

        const data = limitResponse.data as ISuggestionLimitData;

        return data.count;
    } catch {
        throw new Error();
    }
}
