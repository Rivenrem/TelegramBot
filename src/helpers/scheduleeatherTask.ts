import cron, { ScheduledTask } from 'node-cron';
import displayWeather from '#helpers/displayWeather.ts';
import { MyContext } from '#types/context.d.ts';
import messages from '#constants/index.ts';

export default function scheduleWeatherTask(
    ctx: MyContext,
    HH: string,
    MM: string,
): ScheduledTask {
    return cron.schedule(
        `${MM} ${HH} * * *`,
        () => {
            if (ctx.session.chatID && ctx.session.subscribedLocation) {
                displayWeather(ctx, ctx.session.subscribedLocation);

                ctx.telegram.sendMessage(
                    ctx.session.chatID,
                    messages.Weather.scheduledMessage,
                );
            }
        },
        {
            scheduled: true,
            timezone: 'Europe/Minsk',
        },
    );
}
