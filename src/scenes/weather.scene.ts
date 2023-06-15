import { IWeatherData } from 'src/types/weather';
import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import { getWeather } from '../api/getWeather';
import { constants } from '../constants';
import { displayWeather } from '../helpers/displayWeather';
import { MyContext } from '../types/context';

export const weatherScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.WEATHER_SCENE,
    async context => {
        await context.reply(constants.Weather.forecast);
        return context.wizard.next();
    },

    async context => {
        const loadMessage = await context.reply(constants.loading);

        const location = context.message as Message.TextMessage;

        try {
            const weather = await getWeather(location.text);

            await displayWeather(context, weather.data as IWeatherData);
            await context.deleteMessage(loadMessage.message_id);
            await context.scene.leave();
        } catch {
            await context.reply(constants.Error.base);
            await context.deleteMessage(loadMessage.message_id);
            await context.scene.reenter();
        }
    },
);
