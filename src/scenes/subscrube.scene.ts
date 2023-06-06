import { Message } from "typegram";
import { ScheduledTask } from "node-cron";
import { WizardScene } from "telegraf/typings/scenes";
import { MyContext } from "context/context.interface";

import scheduleWeatherTask from "helpers/scheduleeatherTask";
import getHoursAndMinutes from "helpers/getHoursAndMinutes";

import messages from "constants/constants";

export const subscribeScene = new WizardScene<MyContext>(
  "SUBSCRRIBE_SCENE",
  async (ctx) => {
    ctx.reply(messages.weatherSubscribtion);
    return ctx.wizard.next();
  },

  async (ctx) => {
    if (!ctx.message || !("text" in ctx.message)) {
      ctx.reply(messages.wrongLocationSubscribe);
      return;
    }

    ctx.session.chatID = ctx.chat?.id;
    ctx.session.subscribedLocation = (ctx.message as Message.TextMessage).text;

    ctx.reply(messages.weatherSubscribtionTime);

    return ctx.wizard.next();
  },

  async (ctx) => {
    const time = (ctx.message as Message.TextMessage).text;

    if (getHoursAndMinutes(time)) {
      const [HH, MM] = getHoursAndMinutes(time) as RegExpMatchArray;

      weatherTask = scheduleWeatherTask(ctx, HH, MM);
      weatherTask.start();

      ctx.reply(
        `You will recive weather in ${ctx.session.subscribedLocation} every day at ${HH}:${MM} !`
      );
      ctx.scene.leave();
    } else {
      ctx.reply(messages.wrongTime);
    }
  }
);

export let weatherTask: ScheduledTask;
