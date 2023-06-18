import { IWeatherData } from 'src/types/weather';
import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import { getWeather } from '../api/getWeather';
import { constants } from '../constants/index';
import { helpers } from '../helpers/index';
import { MyContext } from '../types/context';

export const weatherScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.WEATHER_SCENE,
    async context => {
        await context.reply(constants.Weather.forecast);
        return context.wizard.next();
    },

    async context => {
        const loadMessage = await context.reply(constants.States.loading);

        const location = context.message as Message.TextMessage;

        try {
            const weather = await getWeather(location.text);

            await helpers.displayWeather(context, weather.data as IWeatherData);
            await context.deleteMessage(loadMessage.message_id);
            await context.scene.leave();
        } catch {
            await context.reply(constants.Errors.base);
            await context.deleteMessage(loadMessage.message_id);
            await context.scene.reenter();
        }
    },
);
