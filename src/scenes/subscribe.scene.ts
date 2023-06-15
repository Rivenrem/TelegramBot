import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import getWeather from '../api/getWeather';
import weatherTask from '../classes/weatherTask';
import messages from '../constants';
import getHoursAndMinutes from '../helpers/getHoursAndMinutes';
import scheduleWeatherTask from '../helpers/scheduledWatherTask';
import { MyContext } from '../types/context';

const subscribeScene = new Scenes.WizardScene<MyContext>(
    'SUBSCRRIBE_SCENE',
    async context => {
        await context.reply(messages.Weather.subscribtion);
        return context.wizard.next();
    },

    async context => {
        if (
            !context.message ||
            !('text' in context.message) ||
            /\d/.test(context.message.text)
        ) {
            await context.reply(messages.Error.badWeatherRequest);
            return;
        }

        const location = (context.message as Message.TextMessage).text;

        try {
            const weatherResponse = await getWeather(location);

            if (weatherResponse.status !== 200) {
                throw new Error();
            }
        } catch {
            await context.reply(messages.Error.badWeatherRequest);
            return;
        }

        context.session.chatID = context.chat?.id;
        context.session.subscribedLocation = location;

        await context.reply(messages.Weather.subscribtionTime);

        context.wizard.next();
    },

    async context => {
        const time = (context.message as Message.TextMessage).text;

        if (getHoursAndMinutes(time)) {
            const [HH, MM] = getHoursAndMinutes(time) as RegExpMatchArray;

            weatherTask.set(scheduleWeatherTask(context, HH, MM));
            weatherTask.get()!.start();

            await context.reply(
                `You will recive weather in ${context.session
                    .subscribedLocation!} every day at ${HH}:${MM} !`,
            );
            await context.scene.leave();
        } else {
            await context.reply(messages.Error.wrongTime);
        }
    },
);

export default subscribeScene;
