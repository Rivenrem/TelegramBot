import axios from "axios";
import configService from "../config/config.service";
import getRandomNumber from "../helpers/getRandomNumber";

export default async function getPhotoURL(category: string): Promise<string> {
  const changedCategory = category === "cat" ? "kitty" : "puppy";

  const URL = `https://pixabay.com/api/?key=${configService.get(
    "PHOTOS_API_KEY"
  )}&q=${
    category === "cat" || category === "dog" ? changedCategory : category
  }&image_type=photo&per_page=200`;

  try {
    const responseData = (await axios.get(URL)).data;

    return responseData.hits[getRandomNumber(200)].webformatURL;
  } catch {
    throw new Error();
  }
}
