import { BaseScene } from "telegraf/typings/scenes";
import { Scenes } from "telegraf";
import { ScheduledTask } from "node-cron";
import {
  weatherSubscribtion,
  doneMessage,
  wrongLocationSubscribe,
} from "../constants/constants";
import { scheduledWeatherTask } from "../helpers/scheduledWeatherTask";

export let currentTask: ScheduledTask;

export const subscribeScene = new BaseScene<Scenes.WizardContext>(
  "SUBSCRRIBE_SCENE"
);

subscribeScene.enter(async (ctx) => {
  await ctx.replyWithHTML(weatherSubscribtion);
});

subscribeScene.on("message", async (ctx) => {
  if (!("text" in ctx.message)) {
    ctx.reply(wrongLocationSubscribe);
  } else {
    const location = ctx.message.text;

    currentTask = scheduledWeatherTask(ctx, ctx.chat?.id, location);
    currentTask.start();

    ctx.reply(doneMessage);
    ctx.scene.leave();
  }
});
