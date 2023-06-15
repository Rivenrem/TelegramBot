/* eslint-disable @typescript-eslint/no-misused-promises */
import cron, { ScheduledTask } from 'node-cron';
import { IWeatherData } from 'src/types/weather';

import getWeather from '../api/getWeather';
import messages from '../constants';
import { MyContext } from '../types/context';
import displayWeather from './displayWeather';

export default function scheduleWeatherTask(
    context: MyContext,
    HH: string,
    MM: string,
): ScheduledTask {
    return cron.schedule(
        `${MM} ${HH} * * *`,
        () =>
            (async () => {
                if (
                    context.session.chatID &&
                    context.session.subscribedLocation
                ) {
                    await context.telegram.sendMessage(
                        context.session.chatID,
                        messages.Weather.scheduledMessage,
                    );

                    const loadMessage = await context.reply(messages.loading);

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
                        await context.reply(messages.Error.base);
                    }
                }
            })(),
        {
            scheduled: true,
            timezone: 'Europe/Minsk',
        },
    );
}