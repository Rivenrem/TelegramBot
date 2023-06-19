import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import { getWeather } from '../api/getWeather';
import { constants } from '../constants/index';
import { helpers } from '../helpers/index';
import { isNewCommand } from '../middleware/isNewCommand';
import { MyContext } from '../types/context';
import { IWeatherData } from '../types/weather';

export const weatherScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.WEATHER_SCENE,
    async context => {
        await context.reply(constants.Weather.forecast);
        return context.wizard.next();
    },

    async context => {
        const location = context.message as Message.TextMessage;

        if (isNewCommand(location.text)) {
            await context.reply(`
            Chose command: ${constants.help}`);

            await context.scene.leave();

            return;
        }

        const loadMessage = await context.reply(constants.States.loading);

        try {
            const weather = await getWeather(location.text);

            await helpers.displayWeather(context, weather.data as IWeatherData);
            await context.deleteMessage(loadMessage.message_id);
            await context.scene.leave();
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === constants.Weather.bagRequestMessage
            ) {
                await context.reply(constants.Errors.badWeatherRequest);
                await context.scene.reenter();
            } else {
                await context.reply(constants.Errors.base);
            }

            await context.deleteMessage(loadMessage.message_id);
        }
    },
);
