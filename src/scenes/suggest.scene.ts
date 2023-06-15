import { IPlace } from 'src/types/suggestion';
import { Scenes } from 'telegraf';
import { Message } from 'typegram';

import messages from '../constants';
import getSuggestion from '../helpers/getSuggestion';
import { MyContext } from '../types/context';

const suggestScene = new Scenes.WizardScene<MyContext>(
    'SUGGEST_SCENE',

    async context => {
        await context.reply(messages.SuggestPlace.city);
        return context.wizard.next();
    },

    async context => {
        const message = context.message as Message.TextMessage;
        const loadMessage = await context.reply(messages.loading);

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
        ${`https://www.google.com/maps/search/?api=1&query=${place.point.lat},${place.point.lon}`}
        
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
            await context.reply(messages.Error.base);
        }

        await context.scene.leave();
    },
);

export default suggestScene;
