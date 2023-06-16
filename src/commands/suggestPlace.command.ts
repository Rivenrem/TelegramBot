import { constants } from '../constants/index';
import { Command } from './command.class';

export class SuggestCommand extends Command {
    handle(): void {
        this.bot.command(constants.Commands.SUGGEST, async context => {
            await context.scene.enter(constants.Scenes.SUGGEST_SCENE);
        });
    }
}
