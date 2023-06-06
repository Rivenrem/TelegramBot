import { WizardScene } from "telegraf/typings/scenes";
import { Message } from "typegram";
import { MyContext } from "../context/context.interface";
import getSuggestion from "../helpers/getSuggestion";

export const suggestScene = new WizardScene<MyContext>(
  "SUGGEST_SCENE",

  async (ctx) => {
    await ctx.reply(
      "In which city would you like to receive an offer of places ?"
    );
    return ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx.message as Message.TextMessage;

    try {
      const place = await getSuggestion(message.text);

      ctx.replyWithHTML(
        `Suggestion for you: ${place.name}. To know more: follow https://www.wikidata.org/wiki/${place.wikidata}`
      );
    } catch {
      console.log;
    }
    ctx.scene.leave();
  }
);
