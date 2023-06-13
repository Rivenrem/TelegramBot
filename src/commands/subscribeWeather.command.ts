import { Telegraf } from 'telegraf';
import { MyContext } from '#types/context.d.ts';
import Command from '#commands/command.class.ts';

import messages from '#constants/index.ts';
import weatherTask from '#classes/weatherTask.ts';

export default class WeatherSubscribtion extends Command {
    constructor(bot: Telegraf<MyContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command('subscribe', ctx => {
            ctx.scene.enter('SUBSCRRIBE_SCENE');
        });

        this.bot.command('unsubscribe', ctx => {
            if (weatherTask.get() && ctx.session.subscribedLocation != null) {
                weatherTask.get()!.stop();
                ctx.session.subscribedLocation = null;
                ctx.reply(messages.done);
            } else {
                ctx.reply(messages.Error.notSubscribed);
            }
        });
    }
}
