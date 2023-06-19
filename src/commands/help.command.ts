import { Command } from '../classes/command.class';
import { constants } from '../constants/index';

export class HelpCommand extends Command {
    handle(): void {
        this.bot.help(context => context.reply(constants.help));
    }
}
