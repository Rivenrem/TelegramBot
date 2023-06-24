import { Command } from 'Classes/command.class';
import { constants } from 'Constants/index';

export class HelpCommand extends Command {
    handle(): void {
        this.bot.help(context => context.reply(constants.commandsText.help));
    }
}
