import axios, { AxiosResponse } from 'axios';

export default async function getWeather(
    location: string,
): Promise<AxiosResponse> {
    try {
        const URL = `${process.env.WEATHER_STATIC_URL
            }/v1/current.json?key=${process.env.WEATHER_API_KEY
            }&q=${location}&aqi=no`; // prettier-ignore

        return await axios.get(URL);
    } catch {
        throw new Error();
    }
}
