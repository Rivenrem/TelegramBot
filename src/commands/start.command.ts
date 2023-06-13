import { Telegraf } from 'telegraf';
import Command from '#commands/command.class.ts';
import { MyContext } from '#types/context.d.ts';

export default class StartCommand extends Command {
    constructor(bot: Telegraf<MyContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start(ctx => {
            ctx.reply(`Hello ${ctx.message.from.first_name || 'stranger'}!`);
        });
    }
}
