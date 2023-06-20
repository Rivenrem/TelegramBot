import axios, { AxiosResponse } from 'axios';
import { constants } from 'Constants/index';

export async function getInfoAboutSuggestion(
    xid: string,
): Promise<AxiosResponse> {
    const placeDescription = await axios.get(
        `${constants.envVariables.OPENTRIP_STATIC_URL
        }/0.1/en/places/xid/${xid
        }?apikey=${constants.envVariables.OPENTRIP_API_KEY}`, // prettier-ignore
    );
    return placeDescription;
}
