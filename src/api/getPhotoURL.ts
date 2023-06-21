import axios from 'axios';
import { constants } from 'Constants/index';
import { helpers } from 'Helpers/index';
import { IPhotoData } from 'Types/photo';

export async function getPhotoURL(category: string): Promise<string> {
    try {
        const categoryX = helpers.processingPhotoCategory(category);

        const URL = `${constants.envVariables.PHOTO_STATIC_URL
        }/api/?key=${constants.envVariables.PHOTOS_API_KEY
        }&q=${categoryX
        }&image_type=photo&per_page=${constants.Numbers.photoPerPageLimit}`; // prettier-ignore

        const responseData = (await axios.get(URL)).data as IPhotoData;

        return responseData.hits[
            helpers.getRandomNumber(constants.Numbers.photoPerPageLimit)
        ].webformatURL;
    } catch {
        throw new Error();
    }
}
