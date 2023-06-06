import { Context } from "telegraf";
import requestWeather from "./requestWeather";
import message from "constants/constants";

export default async function displayWeather(
  ctx: Context,
  text: string
): Promise<void> {
  try {
    const response = await requestWeather(text);
    await ctx.replyWithHTML(
      `Current weather in ${response.data.location.name}: <b>${response.data.current.temp_c}°C ${response.data.current.condition.text}</b>
      `
    );

    ctx.replyWithPhoto({
      source: `./src/images/${response.data.current.condition.icon
        .split("/")
        .slice(-2)
        .join("/")}`,
    });
  } catch (error) {
    if (error instanceof Error) {
      ctx.reply(message.badRequest);
    } else {
      console.error(error);
    }
  }
}
