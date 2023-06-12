import {Message} from "typegram";
import {Scenes} from "telegraf";
import {MyContext} from "../../types/context";

import scheduleWeatherTask from "../helpers/scheduleeatherTask";
import getHoursAndMinutes from "../helpers/getHoursAndMinutes";
import weatherTask from "../classes/weatherTask";

import messages from "../constants";

export const subscribeScene = new Scenes.WizardScene<MyContext>(
  "SUBSCRRIBE_SCENE",
  async (ctx) => {
    ctx.reply(messages.Weather.Subscribtion);
    return ctx.wizard.next();
  },

  async (ctx) => {
    if (
      !ctx.message ||
      !("text" in ctx.message) ||
      ctx.message.text.match(/[0-9]/)
    ) {
      ctx.reply(messages.Error.badWeatherRequest);
      return;
    }

    ctx.session.chatID = ctx.chat?.id;
    ctx.session.subscribedLocation = (ctx.message as Message.TextMessage).text;

    ctx.reply(messages.Weather.SubscribtionTime);

    return ctx.wizard.next();
  },

  async (ctx) => {
    const time = (ctx.message as Message.TextMessage).text;

    if (getHoursAndMinutes(time)) {
      const [HH, MM] = getHoursAndMinutes(time) as RegExpMatchArray;

      weatherTask.set(scheduleWeatherTask(ctx, HH, MM));
      weatherTask.get()!.start();

      ctx.reply(
        `You will recive weather in ${ctx.session.subscribedLocation} every day at ${HH}:${MM} !`
      );
      ctx.scene.leave();
    } else {
      ctx.reply(messages.Error.wrongTime);
    }
  }
);
