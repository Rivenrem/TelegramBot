import { Command } from '../classes/command.class';
import { constants } from '../constants/index';

export class SuggestCommand extends Command {
    handle(): void {
        this.bot.command(constants.Commands.SUGGEST, async context => {
            await context.scene.enter(constants.Scenes.SUGGEST_SCENE);
        });
    }
}
