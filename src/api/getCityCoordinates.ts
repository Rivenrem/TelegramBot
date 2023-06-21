import axios, { AxiosResponse } from 'axios';
import { constants } from 'Constants/index';
import { ICoordinatesData } from 'Types/suggestion';

export async function getCityCoordinates(cityName: string): Promise<string[]> {
    try {
        const coordinates: AxiosResponse = await axios.get(
            `${constants.envVariables.OPENTRIP_STATIC_URL
          }/0.1/en/places/geoname?name=${cityName
      }&apikey=${constants.envVariables.OPENTRIP_API_KEY}`, // prettier-ignore
        );

        const { lat, lon } = coordinates.data as ICoordinatesData;

        return [lat, lon] as string[];
    } catch {
        throw new Error();
    }
}
