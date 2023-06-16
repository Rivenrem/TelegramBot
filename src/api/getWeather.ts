import axios, { AxiosResponse } from 'axios';

import { envVariables } from '../constants/env';

export async function getWeather(location: string): Promise<AxiosResponse> {
    try {
        const URL = `${envVariables.WEATHER_STATIC_URL}/v1/current.json?key=${envVariables.WEATHER_API_KEY}&q=${location}&aqi=no`; // prettier-ignore

        return await axios.get(URL);
    } catch {
        throw new Error();
    }
}
