import Command from "./command.class";
import { Telegraf, Input } from "telegraf";
import { MyContext } from "../context/context.interface";

import messages from "../constants/constants";
import getPhotoURL from "../helpers/getPhotoURL";

export default class PhotoCommand extends Command {
  constructor(bot: Telegraf<MyContext>, private readonly category: string) {
    super(bot);
  }

  handle(): void {
    this.bot.command(this.category, async (ctx) => {
      try {
        const URL = await getPhotoURL(this.category);

        ctx.replyWithPhoto(Input.fromURL(URL));
      } catch {
        ctx.reply(messages.Error.base);
      }
    });
  }
}
