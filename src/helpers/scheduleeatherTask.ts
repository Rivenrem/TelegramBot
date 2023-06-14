import cron, { ScheduledTask } from 'node-cron';
import displayWeather from './displayWeather';
import { MyContext } from '../types/context';
import messages from '../constants';
import getWeather from '../api/getWeather';

export default function scheduleWeatherTask(
    ctx: MyContext,
    HH: string,
    MM: string,
): ScheduledTask {
    return cron.schedule(
        `${MM} ${HH} * * *`,
        async () => {
            if (ctx.session.chatID && ctx.session.subscribedLocation) {
                await ctx.telegram.sendMessage(
                    ctx.session.chatID,
                    messages.Weather.scheduledMessage,
                );

                const loadMessage = await ctx.reply(messages.loading);

                try {
                    const weather = await getWeather(
                        ctx.session.subscribedLocation,
                    );
                    await displayWeather(ctx, weather);
                    ctx.deleteMessage(loadMessage.message_id);
                } catch {
                    await ctx.deleteMessage(loadMessage.message_id);
                    await ctx.reply(messages.Error.base);
                }
            }
        },
        {
            scheduled: true,
            timezone: 'Europe/Minsk',
        },
    );
}
