import axios from 'axios';

export default async function getSityCoordinates(
    cityName: string
): Promise<string[]> {
    try {
        const coordinates = await axios.get(
            `${process.env.OPENTRIP_STATIC_URL
          }/0.1/en/places/geoname?name=${cityName
      }&apikey=${process.env.OPENTRIP_API_KEY}` //prettier-ignore
        );

        if (coordinates.data.status !== 'OK') {
            throw new Error();
        }

        const lat = coordinates.data.lat;
        const lon = coordinates.data.lon;

        return [lat, lon];
    } catch {
        throw new Error();
    }
}
