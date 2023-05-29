import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import axios from "axios";
import { Input } from "telegraf";
import { errorMessage } from "../constants/constants";
import { IConfigService } from "../config/config.interface";

export class PhotoCommand extends Command {
  constructor(
    bot: Telegraf<IBotContext>,
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
      const randomNumber = Math.round(-0.5 + Math.random() * 201);

      try {
        const responseData = (await axios.get(URL)).data;
        ctx.replyWithPhoto(
          Input.fromURL(responseData.hits[randomNumber].webformatURL)
        );
      } catch {
        ctx.reply(errorMessage);
      }
    });
  }
}
