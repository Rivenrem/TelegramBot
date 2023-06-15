import axios from 'axios';
import { IPhotoData } from 'src/types/types';

import constants from '../constants/index';
import getRandomNumber from '../helpers/getRandomNumber';

export default async function getPhotoURL(category: string): Promise<string> {
    const URL = `${process.env.PHOTO_STATIC_URL
        }/api/?key=${process.env.PHOTOS_API_KEY}&q=${category
        }&image_type=photo&per_page=${constants.photoPerPageLimit}`; // prettier-ignore

    try {
        const responseData = (await axios.get(URL)).data as IPhotoData;

        return responseData.hits[getRandomNumber(constants.photoPerPageLimit)]
            .webformatURL;
    } catch {
        throw new Error();
    }
}
