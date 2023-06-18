import axios from 'axios';
import { IPhotoData } from 'src/types/photo';

import { constants } from '../constants/index';
import { helpers } from '../helpers/index';

export async function getPhotoURL(category: string): Promise<string> {
    const categoryX = helpers.processingPhotoCategory(category);

    const URL = `${constants.envVariables.PHOTO_STATIC_URL
        }/api/?key=${constants.envVariables.PHOTOS_API_KEY
        }&q=${categoryX
        }&image_type=photo&per_page=${constants.Numbers.photoPerPageLimit}`; // prettier-ignore

    try {
        const responseData = (await axios.get(URL)).data as IPhotoData;

        return responseData.hits[
            helpers.getRandomNumber(constants.Numbers.photoPerPageLimit)
        ].webformatURL;
    } catch {
        throw new Error();
    }
}
