import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import messages from '../constants';
import { TaskClass } from '../models/task';
import taskRepository from '../repositories';
import { update } from '../services/task.service';
import { MyContext } from '../types/context';

const addTaskScene = new Scenes.WizardScene<MyContext>(
    'ADD_TASK_SCENE',

    async context => {
        await context.reply(messages.Task.addTask);
        return context.wizard.next();
    },

    async context => {
        const message = context.message as Message.TextMessage;

        try {
            if (!context.session.dbObjectID && context.chat !== undefined) {
                const ID = await taskRepository.create(
                    new TaskClass([message.text], context.chat.id),
                );

                context.session.dbObjectID = ID;

                await context.reply(messages.done);
            } else if (context.session.dbObjectID) {
                await update(context.session.dbObjectID, message.text);

                await context.reply(messages.done);
            } else {
                throw new Error();
            }
        } catch {
            await context.reply(messages.Error.base);
        }

        await context.scene.leave();
    },
);

export default addTaskScene;
