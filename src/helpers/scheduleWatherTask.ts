import { api } from 'Api/index';
import { constants } from 'Constants/index';
import { displayWeather } from 'Helpers/displayWeather';
import { weatherErrorHandler } from 'Middleware/weatherErrorHandler';
import cron, { ScheduledTask } from 'node-cron';
import { MyContext } from 'Types/context';
import { IWeatherData } from 'Types/weather';

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
                        const weather = await api.getWeather(
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
