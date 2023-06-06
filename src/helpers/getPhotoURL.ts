import axios from "axios";
import configService from "config/config.service";

export default async function getPhotoURL(category: string): Promise<string> {
  const URL = `https://pixabay.com/api/?key=${configService.get(
    "PHOTOS_API_KEY"
  )}&q=${category}&image_type=photo&per_page=200`;
  const randomNumber = Math.round(-0.5 + Math.random() * 199);

  try {
    const responseData = (await axios.get(URL)).data;

    return responseData.hits[randomNumber].webformatURL;
  } catch {
    throw new Error();
  }
}
