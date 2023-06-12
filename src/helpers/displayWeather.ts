import {MyContext} from "../../types/context";
import messages from "../constants";
import getWeather from "../api/getWeather";

export default async function displayWeather(
  ctx: MyContext,
  text: string
): Promise<void> {
  try {
    const weather = await getWeather(text);

    await ctx.replyWithHTML(
      `Current weather in ${weather.data.location.name}:
      <b>${weather.data.current.temp_c}°C(${weather.data.current.temp_f}°F )
       ${weather.data.current.condition.text}</b>
       `
    );

    ctx.replyWithPhoto({
      source: `./src/images/${weather.data.current.condition.icon
        .split("/")
        .slice(-2)
        .join("/")}`,
    });
  } catch (error) {
    await ctx.reply(messages.Error.base);
    ctx.scene.enter("WEATHER_SCENE");
  }
}
