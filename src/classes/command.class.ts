import { Telegraf } from 'telegraf';
import { MyContext } from 'Types/context';

export abstract class Command {
    constructor(public bot: Telegraf<MyContext>) {}

    abstract handle(): void;
}
