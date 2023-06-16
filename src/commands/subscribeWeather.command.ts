import { weatherTask } from '../classes/weatherTask';
import { constants } from '../constants/index';
import { Command } from './command.class';

export class WeatherSubscribtion extends Command {
    handle(): void {
        this.bot.command(constants.Commands.SUBSCRIBE, async context => {
            await context.scene.enter(constants.Scenes.SUBSCRRIBE_SCENE);
        });

        this.bot.command(constants.Commands.UNSUBSCRIBE, async context => {
            if (
                weatherTask.get() &&
                context.session.subscribedLocation !== null
            ) {
                weatherTask.get()?.stop();
                context.session.subscribedLocation = null;
                await context.reply(constants.States.done);
            } else {
                await context.reply(constants.Errors.notSubscribed);
            }
        });
    }
}
