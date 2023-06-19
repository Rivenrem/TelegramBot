import cron, { ScheduledTask } from 'node-cron';

import { getWeather } from '../api/getWeather';
import { constants } from '../constants/index';
import { weatherErrorHandler } from '../middleware/weatherErrorHandler';
import { MyContext } from '../types/context';
import { IWeatherData } from '../types/weather';
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
                    } catch (error) {
                        await weatherErrorHandler(error, context);
                        await context.deleteMessage(loadMessage.message_id);
                    }
                }
            })(),
        {
            scheduled: true,
            timezone: 'Europe/Minsk',
        },
    );
}
