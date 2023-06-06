import { WizardScene } from "telegraf/typings/scenes";
import { MyContext } from "../context/context.interface";

import { Markup } from "telegraf";

export const addTaskScene = new WizardScene<MyContext>(
  "ADD_TASK_SCENE",

  async (ctx) => {
    {
      await ctx.reply("When to remind you of a task ?", {
        ...Markup.inlineKeyboard([
          Markup.button.callback("Get all my tasks 📝", "getAllTasks"),
          Markup.button.callback("Add new task ✏️", "addNewTask"),
        ]),
      });
    }
  }
);
