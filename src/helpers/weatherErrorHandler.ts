import { AxiosError } from 'axios';
import { constants } from 'Constants/index';
import { MyContext } from 'Types/context';

export async function weatherErrorHandler(
    error: unknown,
    context: MyContext,
): Promise<void> {
    if (
        error instanceof AxiosError &&
        error.message === constants.Weather.bagRequestMessage
    ) {
        await context.reply(constants.Errors.badWeatherRequest);
        await context.scene.reenter();
    } else {
        await context.reply(constants.Errors.base);
    }
}
