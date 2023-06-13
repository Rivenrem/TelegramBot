import { Telegraf } from 'telegraf';
import Command from '#commands/command.class.ts';
import { MyContext } from '#types/context.d.ts';

export default class WeatherCommand extends Command {
    constructor(bot: Telegraf<MyContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command('weather', ctx => {
            ctx.scene.enter('WEATHER_SCENE');
        });
    }
}
