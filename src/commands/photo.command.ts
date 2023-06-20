import { api } from 'Api/index';
import { Command } from 'Classes/command.class';
import { constants } from 'Constants/index';
import { Input, Telegraf } from 'telegraf';
import { MyContext } from 'Types/context';

export class PhotoCommand extends Command {
    constructor(bot: Telegraf<MyContext>, private readonly category: string) {
        super(bot);
    }

    handle(): void {
        this.bot.command(this.category, async context => {
            const loadMessage = await context.reply(constants.States.loading);

            try {
                const picURL = await api.getPhotoURL(this.category);

                await context.replyWithPhoto(Input.fromURL(picURL));
                await context.deleteMessage(loadMessage.message_id);
            } catch {
                await context.deleteMessage(loadMessage.message_id);
                await context.reply(constants.Errors.base);
            }
        });
    }
}
