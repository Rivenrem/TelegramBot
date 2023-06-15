import { IPlace } from 'src/types/suggestion';
import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import { constants } from '../constants';
import { getSuggestion } from '../helpers/getSuggestion';
import { MyContext } from '../types/context';

export const suggestScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.SUGGEST_SCENE,

    async context => {
        await context.reply(constants.SuggestPlace.city);
        return context.wizard.next();
    },

    async context => {
        const message = context.message as Message.TextMessage;
        const loadMessage = await context.reply(constants.loading);

        try {
            const place: IPlace = await getSuggestion(message.text);

            await context.replyWithHTML(
                `Suggestion for you: ${place.name}(Rate: ${place.rate}).
        
        
        ${
            place.wikipedia_extracts
                ? `<b>🟢 ${place.wikipedia_extracts?.title.slice(3)}</b>
          
          ${place.wikipedia_extracts?.text}`
                : `🟢 To know more: ${place.otm}`
        }
        
        📌 Place on google map:
        ${`${process.env.GOOGLE_MAPS_SEARCH_STATIC_URL}/?api=1&query=${place.point.lat},${place.point.lon}`}
        
        `,
            );

            await context.deleteMessage(loadMessage.message_id);

            if (place.preview?.source) {
                await context.replyWithPhoto({
                    url: place.preview?.source,
                });
            }
        } catch {
            await context.deleteMessage(loadMessage.message_id);
            await context.reply(constants.Error.base);
        }

        await context.scene.leave();
    },
);
