import { Command } from '../classes/command.class';
import { constants } from '../constants/index';

export class WeatherCommand extends Command {
    handle(): void {
        this.bot.command(constants.Commands.WEATHER, async context => {
            await context.scene.enter(constants.Scenes.WEATHER_SCENE);
        });
    }
}
