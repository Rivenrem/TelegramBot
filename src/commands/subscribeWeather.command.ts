import { weatherTask } from '../classes/weatherTask';
import { constants } from '../constants/index';
import { Command } from './command.class';

export class WeatherSubscribtion extends Command {
    handle(): void {
        this.bot.command('subscribe', async context => {
            await context.scene.enter(constants.Scenes.SUBSCRRIBE_SCENE);
        });

        this.bot.command('unsubscribe', async context => {
            if (
                weatherTask.get() &&
                context.session.subscribedLocation !== undefined
            ) {
                weatherTask.get()?.stop();
                context.session.subscribedLocation = null;
                await context.reply(constants.done);
            } else {
                await context.reply(constants.Error.notSubscribed);
            }
        });
    }
}
