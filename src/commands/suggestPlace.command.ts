import Command from './command.class';

export default class SuggestCommand extends Command {
    handle(): void {
        this.bot.command('suggest', async context => {
            await context.scene.enter('SUGGEST_SCENE');
        });
    }
}
