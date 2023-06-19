import cron, { ScheduledTask } from 'node-cron';
import { IWeatherData } from 'src/types/weather';

import { getWeather } from '../api/getWeather';
import { constants } from '../constants/index';
import { MyContext } from '../types/context';
import { displayWeather } from './displayWeather';

export function scheduleWeatherTask(
    context: MyContext,
    HH: string,
    MM: string,
): ScheduledTask {
    return cron.schedule(
        `${MM} ${HH} * * *`,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        () =>
            (async () => {
                if (
                    context.session.chatID &&
                    context.session.subscribedLocation
                ) {
                    await context.telegram.sendMessage(
                        context.session.chatID,
                        constants.Weather.scheduledMessage,
                    );

                    const loadMessage = await context.reply(
                        constants.States.loading,
                    );

                    try {
                        const weather = await getWeather(
                            context.session.subscribedLocation,
                        );
                        await displayWeather(
                            context,
                            weather.data as IWeatherData,
                        );
                        await context.deleteMessage(loadMessage.message_id);
                    } catch {
                        await context.deleteMessage(loadMessage.message_id);
                        await context.reply(constants.Errors.base);
                    }
                }
            })(),
        {
            scheduled: true,
            timezone: 'Europe/Minsk',
        },
    );
}
