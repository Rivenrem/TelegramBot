import { Command } from './command.class';

export class StartCommand extends Command {
    handle(): void {
        this.bot.start(async context => {
            await context.reply(
                `Hello ${context.message.from.first_name || 'stranger'}!`,
            );
        });
    }
}
