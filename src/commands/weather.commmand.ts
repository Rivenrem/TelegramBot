import {Telegraf} from "telegraf";
import Command from "./command.class";
import {MyContext} from "../context";

export default class WeatherCommand extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("weather", (ctx) => {
      ctx.scene.enter("WEATHER_SCENE");
    });
  }
}
