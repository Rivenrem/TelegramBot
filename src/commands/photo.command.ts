import { Input, Telegraf } from 'telegraf';

import { getPhotoURL } from '../api/getPhotoURL';
import { constants } from '../constants/index';
import { processingPhotoCategory } from '../helpers/processingPhotoCategory';
import { MyContext } from '../types/context';
import { Command } from './command.class';

export class PhotoCommand extends Command {
    constructor(bot: Telegraf<MyContext>, private readonly category: string) {
        super(bot);
    }

    handle(): void {
        this.bot.command(this.category, async context => {
            const loadMessage = await context.reply(constants.States.loading);

            try {
                const picURL = await getPhotoURL(
                    processingPhotoCategory(this.category),
                );

                await context.replyWithPhoto(Input.fromURL(picURL));
                await context.deleteMessage(loadMessage.message_id);
            } catch {
                await context.deleteMessage(loadMessage.message_id);
                await context.reply(constants.Errors.base);
            }
        });
    }
}
