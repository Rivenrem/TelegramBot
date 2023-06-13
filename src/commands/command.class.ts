import { Telegraf } from 'telegraf';
import { MyContext } from '#types/context.d.ts';

export default abstract class Command {
    constructor(public bot: Telegraf<MyContext>) {}

    abstract handle(): void;
}
