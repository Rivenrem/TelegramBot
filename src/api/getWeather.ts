import axios, { AxiosError, AxiosResponse } from 'axios';

import { constants } from '../constants/index';

export async function getWeather(location: string): Promise<AxiosResponse> {
    try {
        const URL = `${constants.envVariables.WEATHER_STATIC_URL
            }/v1/current.json?key=${constants.envVariables.WEATHER_API_KEY
            }&q=${location}&aqi=no`; // prettier-ignore

        return await axios.get(URL);
    } catch (error) {
        if (
            error instanceof AxiosError &&
            error.response?.status ===
                constants.Numbers.responseStatusBadRequest
        ) {
            throw new AxiosError(constants.Weather.bagRequestMessage);
        } else {
            throw new Error();
        }
    }
}
