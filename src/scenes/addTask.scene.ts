import { WizardScene } from "telegraf/typings/scenes";
import { Message } from "typegram";
import { Task } from "models/task";
import taskRepository from "repositories/task.repository";
import { update } from "services/task.service";
import { MyContext } from "context/context.interface";

import messages from "constants/constants";

export const addTaskScene = new WizardScene<MyContext>(
  "ADD_TASK_SCENE",

  async (ctx) => {
    ctx.reply(messages.addTask);
    return ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx.message as Message.TextMessage;

    try {
      if (!ctx.session.dbObjectID && ctx.chat !== undefined) {
        taskRepository.create(new Task([message], ctx.chat.id));
      } else if (ctx.session.dbObjectID) {
        await update(ctx.session.dbObjectID, message.text);
      } else {
        throw new Error();
      }

      ctx.reply(messages.done);
    } catch (error) {
      console.error(`Can't create new task: ${error}`);
    }

    ctx.scene.leave();
  }
);
