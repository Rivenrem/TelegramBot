import { constants } from 'Constants/index';
import { MyContext } from 'Types/context';

export async function isNewCommand(
    message: string,
    context: MyContext,
): Promise<boolean> {
    if (message.slice(1).toUpperCase() in constants.CommandsNames) {
        await context.reply(`
            ${constants.States.sceneLeave}
            
${constants.commandsText.help}`);

        await context.scene.leave();
        return true;
    }
    return false;
}
