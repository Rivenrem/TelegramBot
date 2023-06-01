import { Scenes, Telegraf } from "telegraf";
import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(bot: Telegraf<Scenes.WizardContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply(`Hello ${ctx.message.from.first_name || "stranger"}!`);
    });
  }
}
