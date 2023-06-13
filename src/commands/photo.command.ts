import Command from "./command.class";
import {Telegraf, Input} from "telegraf";
import {MyContext} from "../types/context";

import messages from "../constants";
import getPhotoURL from "../api/getPhotoURL";
import processingPhotoCategory from "../helpers/processingPhotoCategory";

export default class PhotoCommand extends Command {
  constructor(bot: Telegraf<MyContext>, private readonly category: string) {
    super(bot);
  }

  handle(): void {
    this.bot.command(this.category, async (ctx) => {
      const loadMessage = await ctx.reply(messages.loading);

      try {
        const picURL = await getPhotoURL(
          processingPhotoCategory(this.category)
        );

        await ctx.replyWithPhoto(Input.fromURL(picURL));
        await ctx.deleteMessage(loadMessage.message_id);
      } catch {
        await ctx.deleteMessage(loadMessage.message_id);
        ctx.reply(messages.Error.base);
      }
    });
  }
}
