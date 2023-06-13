import { Message } from 'typegram';
import displayWeather from '../helpers/displayWeather';
import messages from '../constants';
import { MyContext } from '../types/context';
import { Scenes } from 'telegraf';

export const weatherScene = new Scenes.WizardScene<MyContext>(
    'WEATHER_SCENE',
    async ctx => {
        await ctx.reply(messages.Weather.Forecast);
        return ctx.wizard.next();
    },
    async ctx => {
        const message = ctx.message as Message.TextMessage;

        await displayWeather(ctx, message.text);

        ctx.scene.leave();
    },
);
