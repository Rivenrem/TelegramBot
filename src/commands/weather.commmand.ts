import { constants } from '../constants/index';
import { Command } from './command.class';

export class WeatherCommand extends Command {
    handle(): void {
        this.bot.command(constants.Commands.WEATHER, async context => {
            await context.scene.enter(constants.Scenes.WEATHER_SCENE);
        });
    }
}
