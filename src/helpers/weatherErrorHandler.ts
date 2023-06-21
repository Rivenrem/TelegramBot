import { AxiosError } from 'axios';
import { constants } from 'Constants/index';
import { MyContext } from 'Types/context';

export async function weatherErrorHandler(
    error: unknown,
    context: MyContext,
): Promise<void> {
    if (
        error instanceof AxiosError &&
        error.message === constants.Errors.bagRequestMessage
    ) {
        await context.reply(constants.Errors.unknownPlace);
        await context.scene.reenter();
    } else {
        await context.reply(constants.Errors.base);
    }
}
