import { api } from 'Api/index';
import { constants } from 'Constants/index';
import { helpers } from 'Helpers/index';
import { isNewCommand } from 'Helpers/isNewCommand';
import { weatherErrorHandler } from 'Helpers/weatherErrorHandler';
import { Scenes } from 'telegraf';
import { Message } from 'typegram';
import { MyContext } from 'Types/context';
import { IWeatherData } from 'Types/weather';

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
            ${constants.States.sceneLeave}
            
${constants.help}`);

            await context.scene.leave();

            return;
        }

        const loadMessage = await context.reply(constants.States.loading);

        try {
            const weather = await api.getWeather(location.text);

            await helpers.displayWeather(context, weather.data as IWeatherData);
            await context.deleteMessage(loadMessage.message_id);
            await context.scene.leave();
        } catch (error) {
            await weatherErrorHandler(error, context);

            await context.deleteMessage(loadMessage.message_id);
        }
    },
);
