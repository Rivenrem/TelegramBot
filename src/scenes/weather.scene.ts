import { WizardScene } from "telegraf/typings/scenes";
import { Message } from "typegram";
import { displayWeather } from "../helpers/displayWeather";
import { weather } from "../constants/constants";
import { MyContext } from "../context/context.interface";

export const weatherScene = new WizardScene<MyContext>(
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