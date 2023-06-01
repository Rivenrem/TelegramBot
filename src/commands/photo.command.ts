import axios from "axios";
import { Telegraf, Input } from "telegraf";
import { Command } from "./command.class";
import { ConfigService } from "../config/config.service";
import { errorMessage } from "../constants/constants";
import { MyContext } from "../context/context.interface";

const configService = new ConfigService();

export class PhotoCommand extends Command {
  constructor(bot: Telegraf<MyContext>, private readonly category: string) {
    super(bot);
  }

  handle(): void {
    this.bot.command(this.category, async (ctx) => {
      const URL = `https://pixabay.com/api/?key=${configService.get(
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
