import Command from "./command.class";
import {Telegraf, Input} from "telegraf";
import {MyContext} from "../context";

import messages from "../constants";
import getPhotoURL from "../api/getPhotoURL";
import processingPhotoCategory from "../helpers/processingPhotoCategory";

export default class PhotoCommand extends Command {
  constructor(bot: Telegraf<MyContext>, private readonly category: string) {
    super(bot);
  }

  handle(): void {
    this.bot.command(this.category, async (ctx) => {
      try {
        const picURL = await getPhotoURL(
          processingPhotoCategory(this.category)
        );

        ctx.replyWithPhoto(Input.fromURL(picURL));
      } catch {
        ctx.reply(messages.Error.base);
      }
    });
  }
}
