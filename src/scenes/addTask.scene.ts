import { constants } from 'Constants/index';
import { isNewCommand } from 'Helpers/isNewCommand';
import { TaskClass } from 'Models/task';
import { taskRepository } from 'Repositories/index';
import { updateTasks } from 'Services/task.service';
import { Scenes } from 'telegraf';
import { Message } from 'typegram';
import { MyContext } from 'Types/context';

export const addTaskScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.ADD_TASK_SCENE,

    async context => {
        await context.reply(constants.Task.addTask);
        return context.wizard.next();
    },

    async context => {
        const message = context.message as Message.TextMessage;

        if (isNewCommand(message.text)) {
            await context.reply(`
            Chose command: ${constants.help}`);

            await context.scene.leave();

            return;
        }

        try {
            if (!context.session.dbObjectID && context.chat) {
                const ID = await taskRepository.createTask(
                    new TaskClass([message.text], context.chat.id),
                );

                context.session.dbObjectID = ID;

                await context.reply(constants.States.done);
            } else if (context.session.dbObjectID) {
                await updateTasks(context.session.dbObjectID, message.text);

                await context.reply(constants.States.done);
            } else {
                throw new Error();
            }
        } catch {
            await context.reply(constants.Errors.base);
        }

        await context.scene.leave();
    },
);
