import {Telegraf} from "telegraf";
import {MyContext} from "../types/context";
import Command from "./command.class";

import messages from "../constants";

export default class HelpCommand extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.help((ctx) => ctx.reply(messages.commands));
  }
}
