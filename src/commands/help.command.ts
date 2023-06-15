import { constants } from '../constants/index';
import { Command } from './command.class';

export class HelpCommand extends Command {
    handle(): void {
        this.bot.help(context => context.reply(constants.commands));
    }
}
