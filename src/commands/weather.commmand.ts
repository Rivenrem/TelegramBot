import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { MyContext } from "../context/context.interface";
export class WeatherCommand extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("weather", async (ctx) => {
      await ctx.scene.enter("WEATHER_SCENE");
    });
  }
}
