import { ConfigService } from "../config/config.service";
import { WizardScene } from "telegraf/typings/scenes";
import axios from "axios";
import { Message } from "typegram";
import { Scenes } from "telegraf";

import {
  weather,
  badRequestMessage,
  errorMessage,
} from "../constants/constants";

const configService = new ConfigService();

export const weatherScene = new WizardScene<Scenes.WizardContext>(
  "WEATHER",
  async (ctx) => {
    await ctx.replyWithHTML(weather);
    return ctx.wizard.next();
  },
  async (ctx) => {
    const text = ctx.message as Message.TextMessage;
    const URL = `https://api.weatherapi.com/v1/current.json?key=${configService.get(
      "WEATHER_API_KEY"
    )} &q=${text.text}&aqi=no`;

    try {
      const responseData = (await axios.get(URL)).data;

      await ctx.replyWithHTML(
        `Current weather in ${responseData.location.name}: <b>${responseData.current.temp_c}°C ${responseData.current.condition.text}</b>
  `
      );

      await ctx.replyWithPhoto({
        source: `./src/images/${responseData.current.condition.icon
          .split("/")
          .slice(-2)
          .join("/")}`,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        if (error.message === "Bad Request") {
          ctx.reply(badRequestMessage);
        } else {
          ctx.reply(errorMessage);
        }
        return;
      }
    }
    ctx.scene.leave();
  }
);
