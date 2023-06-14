import { Telegraf } from 'telegraf';
import { MyContext } from '#types/context.d.ts';
import Command from '#commands/command.class.ts';

import messages from '#constants/index.ts';

export default class HelpCommand extends Command {
    constructor(bot: Telegraf<MyContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.help(ctx => ctx.reply(messages.commands));
    }
}
