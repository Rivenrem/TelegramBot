import { Scenes, Telegraf } from "telegraf";
import { Command } from "./command.class";
export class WeatherCommand extends Command {
  constructor(bot: Telegraf<Scenes.WizardContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("weather", (ctx) => {
      ctx.scene.enter("WEATHER");
    });
  }
}
