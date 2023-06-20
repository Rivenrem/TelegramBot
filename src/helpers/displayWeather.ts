import { uvIndexProcessing } from 'Helpers/uvIndexProcessing';
import { MyContext } from 'Types/context';
import { IWeatherData } from 'Types/weather';

export async function displayWeather(
    context: MyContext,
    weatherData: IWeatherData,
): Promise<void> {
    await context.replyWithHTML(`

      Current weather in ${weatherData.location.name}: <b>${
        weatherData.current.condition.text
    }</b>

      🌡 ${weatherData.current.temp_c}°C (Feels like:${
        weatherData.current.feelslike_c
    }°C)

      🌬 Wind speed: ${weatherData.current.wind_kph} km/h

      💧Humidity: ${weatherData.current.humidity}

      🌤${uvIndexProcessing(weatherData.current.uv)}
    `);

    await context.replyWithPhoto({
        source: `./src/images/${weatherData.current.condition.icon
            .split('/')
            .slice(-2)
            .join('/')}`,
    });
}
