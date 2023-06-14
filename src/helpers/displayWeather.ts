import { AxiosResponse } from 'axios';

import { MyContext } from '../types/context';

import uvIndexProcessing from './uvIndexProcessing';

export default async function displayWeather(
    ctx: MyContext,
    weather: AxiosResponse,
): Promise<void> {
    await ctx.replyWithHTML(/*HTML*/ `
    Current weather in ${weather.data.location.name}:
    
    <b>🌡 ${weather.data.current.temp_c}°C (${weather.data.current.temp_f}°F )
    
    ${weather.data.current.condition.text}</b>
    
    ${uvIndexProcessing(weather.data.current.uv)}
    `);

    ctx.replyWithPhoto({
        source: `./src/images/${weather.data.current.condition.icon
            .split('/')
            .slice(-2)
            .join('/')}`,
    });
}
