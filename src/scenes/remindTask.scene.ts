import { constants } from 'Constants/index';
import { helpers } from 'Helpers/index';
import { isNewCommand } from 'Helpers/isNewCommand';
import { Scenes } from 'telegraf';
import { Message } from 'typegram';
import { MyContext } from 'Types/context';

export const remindTaskScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.REMIND_TASK_SCENE,

    async context => {
        await context.reply(constants.Task.reminderTime);
        return context.wizard.next();
    },

    async context => {
        const time = (context.message as Message.TextMessage).text;

        if (isNewCommand(time)) {
            await context.reply(`
            Chose command: ${constants.help}`);

            await context.scene.leave();

            return;
        }

        if (helpers.getHoursAndMinutes(time)) {
            const [HH, MM] = helpers.getHoursAndMinutes(
                time,
            ) as RegExpMatchArray;

            if (context.session.tasksToRemind) {
                helpers.createReminde(
                    context,
                    HH,
                    MM,
                    context.session.tasksToRemind[
                        context.session.tasksToRemind.length - 1
                    ],
                );

                context.session.chatID = context.chat?.id;
                await context.reply(
                    `You will get a remind about your task at ${HH}:${MM} !`,
                );
                await context.scene.leave();
            } else {
                await context.reply(constants.Errors.base);
            }
        } else {
            await context.reply(constants.Errors.wrongTime);
        }
    },
);
