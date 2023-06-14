import { Message } from 'typegram';
import { Scenes } from 'telegraf';

import { MyContext } from '#types/context.d.ts';

import displayWeather from '#helpers/displayWeather.ts';
import messages from '#constants/index.ts';

export const weatherScene = new Scenes.WizardScene<MyContext>(
    'WEATHER_SCENE',
    async ctx => {
        await ctx.reply(messages.Weather.forecast);
        return ctx.wizard.next();
    },
    async ctx => {
        const message = ctx.message as Message.TextMessage;

        await displayWeather(ctx, message.text);

        ctx.scene.leave();
    },
);
