import axios, { AxiosResponse } from 'axios';
import { ICoordinatesData } from 'src/types/suggestion';

export async function getCityCoordinates(cityName: string): Promise<string[]> {
    try {
        const coordinates: AxiosResponse = await axios.get(
            `${process.env.OPENTRIP_STATIC_URL
          }/0.1/en/places/geoname?name=${cityName
      }&apikey=${process.env.OPENTRIP_API_KEY}`, // prettier-ignore
        );

        const { status } = coordinates.data as ICoordinatesData;

        if (status !== 'OK') {
            throw new Error();
        }

        const { lat } = coordinates.data as ICoordinatesData;
        const { lon } = coordinates.data as ICoordinatesData;

        return [lat, lon] as string[];
    } catch {
        throw new Error();
    }
}
