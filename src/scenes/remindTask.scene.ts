import { WizardScene } from "telegraf/typings/scenes";
import { MyContext } from "../context/context.interface";
import { Message } from "typegram";
import reminderTask from "../helpers/createReminde";
import getHoursAndMinutes from "../helpers/getHoursAndMinutes";
import messages from "../constants/constants";

export const remindTaskScene = new WizardScene<MyContext>(
  "REMIND_TASK_SCENE",

  async (ctx) => {
    await ctx.reply(messages.reminderTime);
    return ctx.wizard.next();
  },

  (ctx) => {
    const time = (ctx.message as Message.TextMessage).text;

    if (getHoursAndMinutes(time) && ctx.session.taskToRemind) {
      const [HH, MM] = getHoursAndMinutes(time) as RegExpMatchArray;

      reminderTask(ctx, HH, MM, ctx.session.taskToRemind);

      ctx.reply(`You will get a remind about your task at ${HH}:${MM} !`);
      ctx.scene.leave();
    } else {
      ctx.reply(messages.wrongTime);
    }
  }
);
