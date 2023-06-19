import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import { getWeather } from '../api/getWeather';
import { weatherTask } from '../classes/weatherTask';
import { constants } from '../constants/index';
import { helpers } from '../helpers/index';
import { MyContext } from '../types/context';

export const subscribeScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.SUBSCRRIBE_SCENE,
    async context => {
        await context.reply(constants.Weather.subscribtion);
        return context.wizard.next();
    },

    async context => {
        if (
            !context.message ||
            !('text' in context.message) ||
            /\d/.test(context.message.text)
        ) {
            await context.reply(constants.Errors.badWeatherRequest);
            return;
        }

        const location = (context.message as Message.TextMessage).text;

        try {
            const weatherResponse = await getWeather(location);

            if (weatherResponse.status !== 200) {
                throw new Error();
            }
        } catch {
            await context.reply(constants.Errors.badWeatherRequest);
            return;
        }

        context.session.chatID = context.chat?.id;
        context.session.subscribedLocation = location;

        await context.reply(constants.Weather.subscribtionTime);

        context.wizard.next();
    },

    async context => {
        const time = (context.message as Message.TextMessage).text;

        if (helpers.getHoursAndMinutes(time)) {
            const [HH, MM] = helpers.getHoursAndMinutes(
                time,
            ) as RegExpMatchArray;

            weatherTask.set(helpers.scheduleWeatherTask(context, HH, MM));
            weatherTask.get()?.start();

            await context.reply(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                `You will recive weather in ${context.session
                    .subscribedLocation!} every day at ${HH}:${MM} !`,
            );
            await context.scene.leave();
        } else {
            await context.reply(constants.Errors.wrongTime);
        }
    },
);
