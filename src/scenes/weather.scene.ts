import { Message } from 'typegram';
import displayWeather from '../helpers/displayWeather';
import messages from '../constants';
import { MyContext } from '../types/context';
import { Scenes } from 'telegraf';
import getWeather from '../api/getWeather';

export const weatherScene = new Scenes.WizardScene<MyContext>(
    'WEATHER_SCENE',
    async ctx => {
        await ctx.reply(messages.Weather.forecast);
        return ctx.wizard.next();
    },
    async ctx => {
        const loadMessage = await ctx.reply(messages.loading);

        const location = ctx.message as Message.TextMessage;

        try {
            const weather = await getWeather(location.text);
            await displayWeather(ctx, weather);
            ctx.deleteMessage(loadMessage.message_id);
        } catch {
            await ctx.reply(messages.Error.base);
            await ctx.deleteMessage(loadMessage.message_id);

            ctx.scene.enter('WEATHER_SCENE');
        }

        ctx.scene.leave();
    },
);
