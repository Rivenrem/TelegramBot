import { WizardScene } from "telegraf/typings/scenes";
import { scheduleWeatherTask } from "../helpers/scheduleeatherTask";
import { MyContext, sessionData } from "../context/context.interface";
import { Message } from "typegram";
import { ScheduledTask } from "node-cron";
import message from "../constants/constants";
import { getHoursAndMinutes } from "../helpers/getHoursAndMinutes";

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
      const SD: sessionData = ctx.session;

      SD.chatID = ctx.chat?.id;
      SD.subscribedLocation = (ctx.message as Message.TextMessage).text;
      ctx.reply(
        "Type at which hour you want to receive your weather(Send to me time in 24-hours format (e.g. 08:23))"
      );
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
