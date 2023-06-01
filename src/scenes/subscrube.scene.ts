import { BaseScene } from "telegraf/typings/scenes";
import {
  weatherSubscribtion,
  doneMessage,
  wrongLocationSubscribe,
} from "../constants/constants";
import { scheduledWeatherTask } from "../helpers/scheduledWeatherTask";
import { MyContext, sessionData } from "../context/context.interface";
import { Message } from "typegram";
import { ScheduledTask } from "node-cron";

export const subscribeScene = new BaseScene<MyContext>("SUBSCRRIBE_SCENE");
export let weatherTask: ScheduledTask;

subscribeScene.enter((ctx) => {
  ctx.replyWithHTML(weatherSubscribtion);
});

subscribeScene.on("message", async (ctx) => {
  if (!("text" in ctx.message)) {
    ctx.reply(wrongLocationSubscribe);
  } else {
    const SD: sessionData = ctx.session;

    SD.chatID = ctx.chat.id;
    SD.subscribedLocation = (ctx.message as Message.TextMessage).text;

    weatherTask = scheduledWeatherTask(ctx);
    weatherTask.start();

    ctx.reply(doneMessage);
  }
  ctx.scene.leave();
});
