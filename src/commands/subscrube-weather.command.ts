import { Telegraf } from "telegraf";
import { MyContext } from "../context/context.interface";

import { Command } from "./command.class";
import { weatherTask } from "../scenes/subscrube.scene";
import message from "../constants/constants";

export class WeatherSubscribtion extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("subscribe", (ctx) => {
      ctx.scene.enter("SUBSCRRIBE_SCENE");
    });

    this.bot.command("unsubscribe", (ctx) => {
      if (weatherTask) {
        weatherTask.stop();
        ctx.reply(message.done);
      } else {
        ctx.reply(message.notSubscribed);
      }
    });
  }
}
