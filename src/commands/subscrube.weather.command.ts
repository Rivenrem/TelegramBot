import { Telegraf, Scenes } from "telegraf";
import { Command } from "./command.class";

import { currentTask } from "../scenes/subscrube.scene";
import {
  errorMessage,
  doneMessage,
  notSubscribed,
} from "../constants/constants";

export class WeatherSubscribtion extends Command {
  constructor(bot: Telegraf<Scenes.WizardContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("subscribe", async (ctx) => {
      try {
        await ctx.scene.enter("SUBSCRRIBE_SCENE");
      } catch (e) {
        console.log(e);
        ctx.reply(errorMessage);
      }
    });

    this.bot.command("unsubscribe", (ctx) => {
      if (currentTask) {
        currentTask.stop();
        ctx.reply(doneMessage);
      } else {
        ctx.reply(notSubscribed);
      }
    });
  }
}
