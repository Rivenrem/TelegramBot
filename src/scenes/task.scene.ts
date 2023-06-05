import { WizardScene } from "telegraf/typings/scenes";
import { MyContext } from "../context/context.interface";
import { ConfigService } from "../config/config.service";
import { taskQuestion } from "../constants/constants";
import { createTask } from "../helpers/createTask";

const configService = new ConfigService();

export const taskScene = new WizardScene<MyContext>(
  "TASK_SCENE",
  async (ctx) => {
    ctx.reply(taskQuestion);

    return ctx.wizard.next();
  },
  async (ctx) => {
    createTask(ctx, configService);

    ctx.scene.leave();
  }
);
