import { Context } from "telegraf";
import { requestWeather } from "./requestWeather";
import message from "../constants/constants";

export const displayWeather = async (ctx: Context, text: string) => {
  try {
    const responseData = await requestWeather(text);
    await ctx.replyWithHTML(
      `Current weather in ${responseData.location.name}: <b>${responseData.current.temp_c}°C ${responseData.current.condition.text}</b>
      `
    );

    await ctx.replyWithPhoto({
      source: `./src/images/${responseData.current.condition.icon
        .split("/")
        .slice(-2)
        .join("/")}`,
    });
  } catch (error) {
    if (error instanceof Error) {
      await ctx.reply(message.badRequest);
    } else console.log(error);
  }
};
