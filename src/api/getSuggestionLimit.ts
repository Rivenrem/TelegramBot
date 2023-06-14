import axios from 'axios';

export default async function getSuggestionLimit(
    lat: string,
    lon: string
): Promise<number> {
    try {
        const limit = await axios.get(
            `${process.env.OPENTRIP_STATIC_URL
      }/0.1/en/places/radius?radius=1000&lon=${lon
      }&lat=${lat
      }&format=count&apikey=${process.env.OPENTRIP_API_KEY}` //prettier-ignore
        );

        return limit.data.count;
    } catch {
        throw new Error();
    }
}
