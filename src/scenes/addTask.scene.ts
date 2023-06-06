import { WizardScene } from "telegraf/typings/scenes";
import { Message } from "typegram";
import { Task } from "../../models/task";
import taskRepository from "../../repositories/task.repository";
import { update } from "../../services/task.service";
import { MyContext } from "../context/context.interface";

import { doneMessage, taskQuestion } from "../constants/constants";

export const addTaskScene = new WizardScene<MyContext>(
  "ADD_TASK_SCENE",

  async (ctx) => {
    ctx.reply(taskQuestion);
    return ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx.message as Message.TextMessage;

    try {
      if (!ctx.session.dbObjectID && ctx.chat !== undefined) {
        await taskRepository.create(new Task([message], ctx.chat.id), ctx);
      } else if (ctx.session.dbObjectID) {
        await update(ctx.session.dbObjectID, message.text);
      } else {
        throw new Error();
      }

      ctx.reply(doneMessage);
    } catch (error) {
      console.log(`Can't create new task: ${error}`);
    }

    ctx.scene.leave();
  }
);
