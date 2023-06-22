import { Command } from 'Classes/command.class';
import { constants } from 'Constants/index';

export class SuggestCommand extends Command {
    handle(): void {
        this.bot.command(constants.CommandsNames.SUGGEST, async context => {
            await context.scene.enter(constants.Scenes.SUGGEST_SCENE);
        });
    }
}
