import {Message} from "typegram";
import messages from "../constants";
import {MyContext} from "../../types/context";
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

      await ctx.replyWithHTML(
        `Suggestion for you: ${place.name}(Rate: ${place.rate}).

        
        ${
          place.wikipedia_extracts
            ? `<b>🟢 ${place.wikipedia_extracts?.title.slice(3)}</b>
          
          ${place.wikipedia_extracts?.text}`
            : `🟢 To know more: ${place.otm}`
        }

        📌 Place on google map:
        ${`https://www.google.com/maps/search/?api=1&query=${place.point.lat},${place.point.lon}`}

        `
      );

      if (place.preview?.source) {
        ctx.replyWithPhoto({
          url: place.preview?.source,
        });
      }
    } catch (error) {
      ctx.reply(messages.Error.base);
    }

    ctx.scene.leave();
  }
);
