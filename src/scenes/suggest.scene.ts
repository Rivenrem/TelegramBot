import { constants } from 'Constants/index';
import { helpers } from 'Helpers/index';
import { isNewCommand } from 'Helpers/isNewCommand';
import { IPlace } from 'src/types/suggestion';
import { Scenes } from 'telegraf';
import { Message } from 'typegram';
import { MyContext } from 'Types/context';

export const suggestScene = new Scenes.WizardScene<MyContext>(
    constants.Scenes.SUGGEST_SCENE,

    async context => {
        await context.reply(constants.SuggestPlace.city);
        return context.wizard.next();
    },

    async context => {
        const message = context.message as Message.TextMessage;

        if (await isNewCommand(message.text, context)) return;

        const loadMessage = await context.reply(constants.States.loading);

        try {
            const place: IPlace = await helpers.getSuggestion(message.text);

            await context.replyWithHTML(
                `Suggestion for you: ${place.name}(Rate: ${place.rate}).
        
        
        ${
            place.wikipedia_extracts
                ? `<b>🟢 ${place.wikipedia_extracts?.title.slice(3)}</b>
          
          ${place.wikipedia_extracts?.text}`
                : `🟢 To know more: ${place.otm}`
        }
        
        📌 Place on google map:
        ${`${constants.envVariables.GOOGLE_MAPS_SEARCH_STATIC_URL
                }/?api=1&query=${place.point.lat
                },${place.point.lon}`} 
        
        `, // prettier-ignore
            );

            await context.deleteMessage(loadMessage.message_id);

            if (place.preview?.source) {
                await context.replyWithPhoto({
                    url: place.preview?.source,
                });
            }
        } catch {
            await context.deleteMessage(loadMessage.message_id);
            await context.reply(constants.Errors.base);
        }

        await context.scene.leave();
    },
);
