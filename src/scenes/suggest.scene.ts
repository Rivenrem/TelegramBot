import { WizardScene } from "telegraf/typings/scenes";
import { Message } from "typegram";
import messages from "../constants/constants";
import { MyContext } from "../context/context.interface";
import getSuggestion from "../helpers/getSuggestion";

export const suggestScene = new WizardScene<MyContext>(
  "SUGGEST_SCENE",

  async (ctx) => {
    await ctx.reply(messages.suggestCity);
    return ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx.message as Message.TextMessage;

    try {
      const place = await getSuggestion(message.text);

      ctx.replyWithHTML(
        `Suggestion for you: ${place.name}. To know more: follow https://www.wikidata.org/wiki/${place.wikidata}`
      );
    } catch (error) {
      console.error(error);
      ctx.reply(messages.error);
    }
    ctx.scene.leave();
  }
);
