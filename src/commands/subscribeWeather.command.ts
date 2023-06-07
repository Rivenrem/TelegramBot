import { Telegraf } from "telegraf";
import { MyContext } from "../context/context.interface";
import Command from "./command.class";

import { weatherTask } from "../scenes/subscribe.scene";
import messages from "../constants/constants";

export default class WeatherSubscribtion extends Command {
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
        ctx.reply(messages.done);
      } else {
        ctx.reply(messages.notSubscribed);
      }
    });
  }
}
