import { Telegraf } from "telegraf";
import { MyContext } from "../context/context.interface";
import Command from "./command.class";

import message from "../constants/constants";

export default class HelpCommand extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.help((ctx) => ctx.reply(message.commands));
  }
}
