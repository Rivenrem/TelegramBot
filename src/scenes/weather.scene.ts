import { WizardScene } from "telegraf/typings/scenes";
import { Message } from "typegram";
import { Scenes } from "telegraf";
import { displayWeather } from "../helpers/displayWeather";
import { weather } from "../constants/constants";

export const weatherScene = new WizardScene<Scenes.WizardContext>(
  "WEATHER_SCENE",
  async (ctx) => {
    await ctx.replyWithHTML(weather);
    return ctx.wizard.next();
  },
  async (ctx) => {
    const message = ctx.message as Message.TextMessage;

    await displayWeather(ctx, message.text);

    ctx.scene.leave();
  }
);
