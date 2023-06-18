import axios, { AxiosResponse } from 'axios';

import { constants } from '../constants/index';

export async function getWeather(location: string): Promise<AxiosResponse> {
    try {
        const URL = `${constants.envVariables.WEATHER_STATIC_URL
            }/v1/current.json?key=${constants.envVariables.WEATHER_API_KEY
            }&q=${location}&aqi=no`; // prettier-ignore

        return await axios.get(URL);
    } catch {
        throw new Error();
    }
}
