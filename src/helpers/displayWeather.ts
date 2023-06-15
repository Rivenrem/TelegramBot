import { IWeatherData } from 'src/types/weather';

import { MyContext } from '../types/context';
import uvIndexProcessing from './uvIndexProcessing';

export default async function displayWeather(
    context: MyContext,
    weatherData: IWeatherData,
): Promise<void> {
    await context.replyWithHTML(`

      Current weather in ${weatherData.location.name}:

      <b>🌡 ${weatherData.current.temp_c}°C (${weatherData.current.temp_f}°F )

      ${weatherData.current.condition.text}</b>

      ${uvIndexProcessing(weatherData.current.uv)}
    `);

    await context.replyWithPhoto({
        source: `./src/images/${weatherData.current.condition.icon
            .split('/')
            .slice(-2)
            .join('/')}`,
    });
}
