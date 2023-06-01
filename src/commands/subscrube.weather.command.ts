import { Telegraf } from "telegraf";
import { Command } from "./command.class";

import { doneMessage, notSubscribed } from "../constants/constants";
import { MyContext } from "../context/context.interface";
import { weatherTask } from "../scenes/subscrube.scene";

export class WeatherSubscribtion extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("subscribe", async (ctx) => {
      await ctx.scene.enter("SUBSCRRIBE_SCENE");
    });

    this.bot.command("unsubscribe", (ctx) => {
      if (weatherTask) {
        weatherTask.stop();
        // weatherTask = null;
        ctx.reply(doneMessage);
      } else {
        ctx.reply(notSubscribed);
      }
    });
  }
}
