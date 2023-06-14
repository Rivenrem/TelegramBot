import { Message } from 'typegram';
import { Scenes } from 'telegraf';

import taskRepository from '#repositories/index.ts';
import { update } from '#services/task.service.ts';
import { MyContext } from '#types/context.d.ts';

import messages from '#constants/index.ts';
import { TaskClass } from '#models/task.ts';

export const addTaskScene = new Scenes.WizardScene<MyContext>(
    'ADD_TASK_SCENE',

    async ctx => {
        ctx.reply(messages.Task.addTask);
        return ctx.wizard.next();
    },

    async ctx => {
        const message = ctx.message as Message.TextMessage;

        try {
            if (!ctx.session.dbObjectID && ctx.chat !== undefined) {
                const ID = taskRepository.create(
                    new TaskClass([message.text], ctx.chat.id),
                );

                ctx.session.dbObjectID = ID;

                ctx.reply(messages.done);
            } else if (ctx.session.dbObjectID) {
                await update(ctx.session.dbObjectID, message.text);

                ctx.reply(messages.done);
            } else {
                throw new Error();
            }
        } catch (error) {
            ctx.reply(messages.Error.base);
        }

        ctx.scene.leave();
    },
);
