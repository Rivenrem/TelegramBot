import { Telegraf } from 'telegraf';

import { MyContext } from '../types/context';

export abstract class Command {
    constructor(public bot: Telegraf<MyContext>) {}

    abstract handle(): void;
}
