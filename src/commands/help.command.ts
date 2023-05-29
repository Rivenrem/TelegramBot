import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { commands } from '../constants/constants';

export class HelpCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void{
    this.bot.help((ctx) => ctx.reply(commands))
  }
}