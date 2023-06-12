import {Message} from "typegram";
import messages from "../constants";
import {MyContext} from "../context";
import getSuggestion from "../helpers/getSuggestion";
import {Scenes} from "telegraf";

export const suggestScene = new Scenes.WizardScene<MyContext>(
  "SUGGEST_SCENE",

  async (ctx) => {
    await ctx.reply(messages.SuggestPlace.City);
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
      ctx.reply(messages.Error.base);
    }
    ctx.scene.leave();
  }
);
