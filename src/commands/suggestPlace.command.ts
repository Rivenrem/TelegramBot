import { Telegraf } from 'telegraf';
import { MyContext } from '#types/context.d.ts';
import Command from '#commands/command.class.ts';

export default class SuggestCommand extends Command {
    constructor(bot: Telegraf<MyContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command('suggest', ctx => {
            ctx.scene.enter('SUGGEST_SCENE');
        });
    }
}
