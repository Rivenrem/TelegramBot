import { Telegraf, Markup } from "telegraf";
import { Command } from "./command.class";
import { MyContext } from "../context/context.interface";
import { doneMessage, taskQuestion } from "../constants/constants";
import axios, { AxiosResponse } from "axios";
import { TaskClass } from "../../models/task";
import { IConfigService } from "../config/config.interface";
import { getTaskById } from "../../controllers/task-controller";
import { findById } from "../../repositories/task.repository";

export class TaskCommand extends Command {
  constructor(
    bot: Telegraf<MyContext>,
    private readonly configService: IConfigService
  ) {
    super(bot);
  }

  handle(): void {
    this.bot.command("task", async (ctx) => {
      await ctx.reply(taskQuestion, {
        ...Markup.inlineKeyboard([
          Markup.button.callback("Get all my tasks", "getAllTasks"),
          Markup.button.callback("Add new task", "addNewTask"),
        ]),
      });
    });

    this.bot.action("addNewTask", async (ctx) => {
      ctx.scene.enter("TASK_SCENE");
    });

    this.bot.action("getAllTasks", async (ctx) => {
      if (!ctx.session.dbObjectID) {
        ctx.reply("You don't have tasks. Lets create some ?", {
          ...Markup.inlineKeyboard([
            Markup.button.callback("yes", "addNewTask"),
          ]),
        });
      }
      let response;

      if (ctx.session.dbObjectID) {
        response = await findById(ctx.session.dbObjectID);
      }

      response?.tasksArray.map(async (task: string) => {
        await ctx.reply("Here are your tasks:");
        await ctx.reply(task, {
          ...Markup.inlineKeyboard([
            Markup.button.callback("Delete task", "deleteTask"),
            Markup.button.callback("Edit task", "editTask"),
          ]),
        });
      });
    });

    // this.bot.action("deleteTask", (ctx) => {
    //   {
    //     axios
    //       .delete(
    //         `http://localhost:${this.configService.get("PORT")}/tasks/${
    //           task.id
    //         }`
    //       )
    //       .then(() => {
    //         ctx.reply(doneMessage);
    //       });
    //   }
    // });
  }
}
