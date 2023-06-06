import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { MyContext } from "../context/context.interface";

export class SuggestCommand extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("suggest", (ctx) => {
      ctx.scene.enter("SUGGEST_SCENE");
    });
  }
}
