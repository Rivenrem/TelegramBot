import axios from 'axios';
import { IPhotoData } from 'src/types/photo';

import { envVariables } from '../constants/env';
import { constants } from '../constants/index';
import { getRandomNumber } from '../helpers/getRandomNumber';

export async function getPhotoURL(category: string): Promise<string> {
    const URL = `${envVariables.PHOTO_STATIC_URL}/api/?key=${envVariables.PHOTOS_API_KEY}&q=${category}&image_type=photo&per_page=${constants.photoPerPageLimit}`; // prettier-ignore

    try {
        const responseData = (await axios.get(URL)).data as IPhotoData;

        return responseData.hits[getRandomNumber(constants.photoPerPageLimit)]
            .webformatURL;
    } catch {
        throw new Error();
    }
}
