import weatherTask from '../classes/weatherTask';
import messages from '../constants/index';
import Command from './command.class';

export default class WeatherSubscribtion extends Command {
    handle(): void {
        this.bot.command('subscribe', async context => {
            await context.scene.enter('SUBSCRRIBE_SCENE');
        });

        this.bot.command('unsubscribe', async context => {
            if (
                weatherTask.get() &&
                context.session.subscribedLocation !== undefined
            ) {
                weatherTask.get()?.stop();
                context.session.subscribedLocation = null;
                await context.reply(messages.done);
            } else {
                await context.reply(messages.Error.notSubscribed);
            }
        });
    }
}
