import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import message from "../constants/constants";
import { MyContext } from "../context/context.interface";

export class HelpCommand extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.help((ctx) => ctx.reply(message.commands));
  }
}
