import { Telegraf } from "telegraf";
import { MyContext } from "../context/context.interface";
import Command from "./command.class";

import messages from "../constants/constants";
import weatherTask from "../classes/weatherTask";

export default class WeatherSubscribtion extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("subscribe", (ctx) => {
      ctx.scene.enter("SUBSCRRIBE_SCENE");
    });

    this.bot.command("unsubscribe", (ctx) => {
      if (weatherTask.get()) {
        weatherTask.get()!.stop();
        ctx.reply(messages.done);
      } else {
        ctx.reply(messages.Error.notSubscribed);
      }
    });
  }
}
