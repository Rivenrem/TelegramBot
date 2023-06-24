import { Command } from 'Classes/command.class';
import { weatherTask } from 'Classes/weatherTask';
import { constants } from 'Constants/index';

export class WeatherSubscribtion extends Command {
    handle(): void {
        this.bot.command(constants.CommandsNames.SUBSCRIBE, async context => {
            await context.scene.enter(constants.Scenes.SUBSCRRIBE_SCENE);
        });

        this.bot.command(constants.CommandsNames.UNSUBSCRIBE, async context => {
            if (weatherTask.get() && context.session.subscribedLocation) {
                weatherTask.get()?.stop();

                context.session.subscribedLocation = null;

                await context.reply(constants.States.done);
            } else {
                await context.reply(constants.Errors.notSubscribed);
            }
        });
    }
}
