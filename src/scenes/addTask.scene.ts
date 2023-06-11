import { Message } from "typegram";

import taskRepository from "../repositories/task.repository";
import { update } from "../services/task.service";
import { MyContext } from "../context/context.interface";

import messages from "../constants/constants";
import { TaskClass } from "../models/task";
import { Scenes } from "telegraf";

export const addTaskScene = new Scenes.WizardScene<MyContext>(
  "ADD_TASK_SCENE",

  async (ctx) => {
    ctx.reply(messages.Task.addTask);
    return ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx.message as Message.TextMessage;

    try {
      if (!ctx.session.dbObjectID && ctx.chat !== undefined) {
        const ID = taskRepository.create(
          new TaskClass([message.text], ctx.chat.id)
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
  }
);
