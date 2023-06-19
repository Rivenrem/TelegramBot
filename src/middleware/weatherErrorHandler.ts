import { AxiosError } from 'axios';
import { MyContext } from 'src/types/context';

import { constants } from '../constants/index';

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
