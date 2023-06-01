import { Scenes, Telegraf } from "telegraf";
import { Command } from "./command.class";
export class WeatherCommand extends Command {
  constructor(bot: Telegraf<Scenes.WizardContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("weather", async (ctx) => {
      await ctx.scene.enter("WEATHER_SCENE");
    });
  }
}
