import { Message } from 'typegram';
import { Scenes } from 'telegraf';
import { MyContext } from '../types/context';

import scheduleWeatherTask from '../helpers/scheduleeatherTask';
import getHoursAndMinutes from '../helpers/getHoursAndMinutes';
import weatherTask from '../classes/weatherTask';

import messages from '../constants';
import getWeather from '../api/getWeather';

export const subscribeScene = new Scenes.WizardScene<MyContext>(
    'SUBSCRRIBE_SCENE',
    async ctx => {
        ctx.reply(messages.Weather.subscribtion);
        return ctx.wizard.next();
    },

    async ctx => {
        if (
            !ctx.message ||
            !('text' in ctx.message) ||
            ctx.message.text.match(/\d/)
        ) {
            ctx.reply(messages.Error.badWeatherRequest);
            return;
        }

        const location = (ctx.message as Message.TextMessage).text;

        try {
            const weatherResponse = await getWeather(location);

            if (weatherResponse.status !== 200) {
                throw new Error();
            }
        } catch {
            ctx.reply(messages.Error.badWeatherRequest);
            return;
        }

        ctx.session.chatID = ctx.chat?.id;
        ctx.session.subscribedLocation = location;

        ctx.reply(messages.Weather.subscribtionTime);

        return ctx.wizard.next();
    },

    async ctx => {
        const time = (ctx.message as Message.TextMessage).text;

        if (getHoursAndMinutes(time)) {
            const [HH, MM] = getHoursAndMinutes(time) as RegExpMatchArray;

            weatherTask.set(scheduleWeatherTask(ctx, HH, MM));
            weatherTask.get()!.start();

            ctx.reply(
                `You will recive weather in ${ctx.session.subscribedLocation} every day at ${HH}:${MM} !`,
            );
            ctx.scene.leave();
        } else {
            ctx.reply(messages.Error.wrongTime);
        }
    },
);
