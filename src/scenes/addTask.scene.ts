import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import { constants } from '../constants';
import { TaskClass } from '../models/task';
import { taskRepository } from '../repositories';
import { updateTasks } from '../services/task.service';
import { MyContext } from '../types/context';

export const addTaskScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.ADD_TASK_SCENE,

    async context => {
        await context.reply(constants.Task.addTask);
        return context.wizard.next();
    },

    async context => {
        const message = context.message as Message.TextMessage;

        try {
            if (!context.session.dbObjectID && context.chat !== undefined) {
                const ID = await taskRepository.createTask(
                    new TaskClass([message.text], context.chat.id),
                );

                context.session.dbObjectID = ID;

                await context.reply(constants.done);
            } else if (context.session.dbObjectID) {
                await updateTasks(context.session.dbObjectID, message.text);

                await context.reply(constants.done);
            } else {
                throw new Error();
            }
        } catch {
            await context.reply(constants.Error.base);
        }

        await context.scene.leave();
    },
);
