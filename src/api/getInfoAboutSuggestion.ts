import axios, { AxiosResponse } from 'axios';

import { envVariables } from '../constants/env';

export async function getInfoAboutSuggestion(
    xid: string,
): Promise<AxiosResponse> {
    const placeDescription = await axios.get(
        `${envVariables.OPENTRIP_STATIC_URL
      }/0.1/en/places/xid/${xid}?apikey=${envVariables.OPENTRIP_API_KEY}`, // prettier-ignore
    );
    return placeDescription;
}
