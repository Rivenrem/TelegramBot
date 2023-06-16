import axios, { AxiosResponse } from 'axios';

import { envVariables } from '../constants/env';

export async function getSuggestedPlace(
    lat: string,
    lon: string,
    limit: number,
): Promise<AxiosResponse> {
    try {
        const suggestedPlace = await axios.get(
            `${envVariables.OPENTRIP_STATIC_URL
          }/0.1/en/places/radius?radius=1000&lon=${lon
          }&lat=${lat}&format=json&limit=${limit
          }&apikey=${envVariables.OPENTRIP_API_KEY}`, // prettier-ignore
        );

        return suggestedPlace;
    } catch {
        throw new Error();
    }
}
