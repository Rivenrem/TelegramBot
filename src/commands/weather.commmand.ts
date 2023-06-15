import Command from './command.class';

export default class WeatherCommand extends Command {
    handle(): void {
        this.bot.command('weather', async context => {
            await context.scene.enter('WEATHER_SCENE');
        });
    }
}
