import axios from "axios";
import { Command } from "./command.class";
import { Telegraf, Input } from "telegraf";
import message from "../constants/constants";
import { MyContext } from "../context/context.interface";
import { IConfigService } from "../config/config.interface";

export class PhotoCommand extends Command {
  constructor(
    bot: Telegraf<MyContext>,
    private readonly category: string,
    private readonly configService: IConfigService
  ) {
    super(bot);
  }

  handle(): void {
    this.bot.command(this.category, async (ctx) => {
      const URL = `https://pixabay.com/api/?key=${this.configService.get(
        "PHOTOS_API_KEY"
      )}&q=${this.category}&image_type=photo&per_page=200`;

      const randomNumber = Math.round(-0.5 + Math.random() * 200);

      try {
        const responseData = (await axios.get(URL)).data;
        ctx.replyWithPhoto(
          Input.fromURL(responseData.hits[randomNumber].webformatURL)
        );
      } catch {
        ctx.reply(message.error);
      }
    });
  }
}
