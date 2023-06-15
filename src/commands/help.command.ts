import messages from '../constants';
import Command from './command.class';

export default class HelpCommand extends Command {
    handle(): void {
        this.bot.help(context => context.reply(messages.commands));
    }
}
