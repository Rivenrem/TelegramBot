import { WizardScene } from "telegraf/typings/scenes";
import { MyContext } from "context/context.interface";
import { Message } from "typegram";
import reminderTask from "helpers/createReminde";
import getHoursAndMinutes from "helpers/getHoursAndMinutes";
import message from "constants/constants";

export const remindTaskScene = new WizardScene<MyContext>(
  "REMIND_TASK_SCENE",

  async (ctx) => {
    await ctx.reply(
      "When to remind you of a task ? Send to me time in 24-hours format (e.g. 08:23)"
    );
    return ctx.wizard.next();
  },

  (ctx) => {
    const time = (ctx.message as Message.TextMessage).text;

    if (getHoursAndMinutes(time) && ctx.session.taskToRemind) {
      const [HH, MM] = getHoursAndMinutes(time) as RegExpMatchArray;

      reminderTask(ctx, HH, MM, ctx.session.taskToRemind);

      ctx.reply(
        `${message.done}You will get a remind about your task at ${HH}:${MM} !`
      );
      ctx.scene.leave();
    } else {
      ctx.reply("Wrong time format.Try again");
    }
  }
);
