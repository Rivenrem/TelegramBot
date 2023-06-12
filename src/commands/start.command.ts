import {Telegraf} from "telegraf";
import Command from "./command.class";
import {MyContext} from "../context";

export default class StartCommand extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply(`Hello ${ctx.message.from.first_name || "stranger"}!`);
    });
  }
}
