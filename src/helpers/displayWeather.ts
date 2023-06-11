import { Context } from "telegraf";
import messages from "../constants/constants";
import getWeather from "../api/getWeather";

export default async function displayWeather(
  ctx: Context,
  text: string
): Promise<void> {
  try {
    const weather = await getWeather(text);

    await ctx.replyWithHTML(
      `Current weather in ${weather.data.location.name}: <b>${weather.data.current.temp_c}°C ${weather.data.current.condition.text}</b>
      `
    );

    ctx.replyWithPhoto({
      source: `./src/images/${weather.data.current.condition.icon
        .split("/")
        .slice(-2)
        .join("/")}`,
    });
  } catch (error) {
    ctx.reply(messages.Error.base);
  }
}
