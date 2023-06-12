import {Telegraf} from "telegraf";
import {MyContext} from "../context";
import Command from "./command.class";

export default class SuggestCommand extends Command {
  constructor(bot: Telegraf<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("suggest", (ctx) => {
      ctx.scene.enter("SUGGEST_SCENE");
    });
  }
}
