import { Message } from "typegram";
import { ScheduledTask } from "node-cron";
import { WizardScene } from "telegraf/typings/scenes";
import { MyContext } from "../context/context.interface";

import { scheduleWeatherTask } from "../helpers/scheduleeatherTask";
import { getHoursAndMinutes } from "../helpers/getHoursAndMinutes";

import message from "../constants/constants";

export const subscribeScene = new WizardScene<MyContext>(
  "SUBSCRRIBE_SCENE",
  async (ctx) => {
    ctx.reply(message.weatherSubscribtion);
    return ctx.wizard.next();
  },

  async (ctx) => {
    if (!ctx.message || !("text" in ctx.message)) {
      ctx.reply(message.wrongLocationSubscribe);
    } else {
      ctx.session.chatID = ctx.chat?.id;
      ctx.session.subscribedLocation = (
        ctx.message as Message.TextMessage
      ).text;

      ctx.reply(message.weatherSubscribtionTime);

      return ctx.wizard.next();
    }
  },

  async (ctx) => {
    const time = (ctx.message as Message.TextMessage).text;

    if (getHoursAndMinutes(time)) {
      const [HH, MM] = getHoursAndMinutes(time) as RegExpMatchArray;

      weatherTask = scheduleWeatherTask(ctx, HH, MM);
      weatherTask.start();

      ctx.reply(
        `${message.done}You will recive weather in ${ctx.session.subscribedLocation} every day at ${HH}:${MM} !`
      );
      ctx.scene.leave();
    } else {
      ctx.reply("Wrong time format.Try again");
    }
  }
);

export let weatherTask: ScheduledTask;
