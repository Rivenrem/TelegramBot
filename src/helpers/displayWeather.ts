import { MyContext } from '../types/context';
import messages from '../constants';
import getWeather from '../api/getWeather';
import uvIndexProcessing from './uvIndexProcessing';

export default async function displayWeather(
    ctx: MyContext,
    text: string,
): Promise<void> {
    const loadMessage = await ctx.reply(messages.loading);
    try {
        const weather = await getWeather(text);

        await ctx.replyWithHTML(/*HTML*/ `
    Current weather in ${weather.data.location.name}:
    
    <b>🌡 ${weather.data.current.temp_c}°C (${weather.data.current.temp_f}°F )
    
    ${weather.data.current.condition.text}</b>
    
    ${uvIndexProcessing(weather.data.current.uv)}
    `);

        ctx.deleteMessage(loadMessage.message_id);

        ctx.replyWithPhoto({
            source: `./src/images/${weather.data.current.condition.icon
                .split('/')
                .slice(-2)
                .join('/')}`,
        });
    } catch (error) {
        await ctx.deleteMessage(loadMessage.message_id);
        await ctx.reply(messages.Error.base);
        ctx.scene.enter('WEATHER_SCENE');
    }
}
