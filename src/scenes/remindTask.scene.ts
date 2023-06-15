import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import { constants } from '../constants';
import { reminderTask } from '../helpers/createReminde';
import { getHoursAndMinutes } from '../helpers/getHoursAndMinutes';
import { MyContext } from '../types/context';

export const remindTaskScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.REMIND_TASK_SCENE,

    async context => {
        await context.reply(constants.Task.reminderTime);
        return context.wizard.next();
    },

    async context => {
        const time = (context.message as Message.TextMessage).text;

        if (getHoursAndMinutes(time) && context.session.taskToRemind) {
            const [HH, MM] = getHoursAndMinutes(time) as RegExpMatchArray;

            reminderTask(context, HH, MM, context.session.taskToRemind);
            context.session.chatID = context.chat?.id;

            await context.reply(
                `You will get a remind about your task at ${HH}:${MM} !`,
            );
            await context.scene.leave();
        } else {
            await context.reply(constants.Error.wrongTime);
        }
    },
);
