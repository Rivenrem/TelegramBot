import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface"
import { weather, errorMessage, badRequestMessage } from '../constants/constants';
import { IConfigService } from '../config/config.interface';
import axios from "axios";

export class WeatherCommand extends Command {
  constructor(bot: Telegraf<IBotContext>, private readonly configService: IConfigService) {
    super(bot);
  }

  handle(): void{
    this.bot.command("weather", (ctx) => {
  try {
    ctx.replyWithHTML(weather);
    
  } catch {
    ctx.reply(errorMessage);
  }
    });
    
  
this.bot.on("text", async (ctx) => {

  ctx.session.location = ctx.message?.text;
  const URL = `https://api.weatherapi.com/v1/current.json?key=${this.configService.get("WEATHER_API_KEY")} &q=${ctx.message.text}&aqi=no`;

  try {
    const responseData = (await axios.get(URL)).data;

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
  }
  catch (error) {
    if (error instanceof Error) {
      if (error.message === "Bad Request") {
      ctx.reply(badRequestMessage);
    } else {
      ctx.reply(errorMessage);
    }
    }
  }
});
  }
}