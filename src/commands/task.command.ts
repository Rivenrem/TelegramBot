import { Telegraf, Markup } from "telegraf";
import Command from "./command.class";

import { MyContext } from "../context/context.interface";
import { ICallback } from "../interfaces/callback.interface";

import taskRepository from "../repositories/task.repository";
import { deleteTask } from "../services/task.service";

import messages from "../constants/constants";

export default class TaskCommand extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("task", (ctx) => {
      ctx.reply(messages.Task.addTask, {
        ...Markup.inlineKeyboard([
          Markup.button.callback("Get all my tasks 📝", "getAllTasks"),
          Markup.button.callback("Add new task ✏️", "addNewTask"),
        ]),
      });
    });

    this.bot.action("getAllTasks", async (ctx) => {
      if (!ctx.session.dbObjectID) {
        ctx.reply(messages.Error.noTasks, {
          ...Markup.inlineKeyboard([
            Markup.button.callback("yes", "addNewTask"),
          ]),
        });

        return;
      }

      const response = await taskRepository.findById(ctx.session.dbObjectID);

      if (response.tasksArray.length === 0) {
        ctx.reply(messages.Error.noTasks, {
          ...Markup.inlineKeyboard([
            Markup.button.callback("yes", "addNewTask"),
          ]),
        });

        return;
      }

      await ctx.reply("Your tasks:");

      response.tasksArray.map(async (task: string) => {
        await ctx.reply(`📌 ${task}`, {
          ...Markup.inlineKeyboard([
            Markup.button.callback("Delete task ❌", "deleteTask"),
            Markup.button.callback("Add reminder ⏰", "remindAboutTask"),
          ]),
        });
      });
    });

    this.bot.action("addNewTask", (ctx) => {
      ctx.scene.enter("ADD_TASK_SCENE");
    });

    this.bot.action("deleteTask", (ctx) => {
      const callback = ctx.callbackQuery.message as ICallback;
      const taskToDelete = callback.text;

      if (ctx.session.dbObjectID) {
        deleteTask(ctx.session.dbObjectID, taskToDelete);
        ctx.deleteMessage(ctx.callbackQuery.message?.message_id);
      }
    });

    this.bot.action("remindAboutTask", (ctx) => {
      const callback = ctx.callbackQuery.message as ICallback;
      const taskToRemind = callback.text;

      ctx.session.taskToRemind = taskToRemind;

      ctx.scene.enter("REMIND_TASK_SCENE");
    });
  }
}
