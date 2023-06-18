import { Scenes, Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';

import { commands } from '../commands/index';
import { constants } from '../constants/index';
import { scenes } from '../scenes/index';
import { MyContext } from '../types/context';
import { Command } from './command.class';

const stage = new Scenes.Stage<MyContext>(scenes);
const localSession = new LocalSession({ database: 'sessions.json' });

export class Bot {
    bot: Telegraf<MyContext>;

    commands: Command[] = [];

    constructor() {
        this.bot = new Telegraf<MyContext>(constants.envVariables.BOT_TOKEN);
        this.bot.use(localSession.middleware());
        this.bot.use(stage.middleware());
    }

    async init() {
        this.commands = [
            new commands.HelpCommand(this.bot),
            new commands.PhotoCommand(this.bot, 'cat'),
            new commands.PhotoCommand(this.bot, 'dog'),
            new commands.StartCommand(this.bot),
            new commands.WeatherCommand(this.bot),
            new commands.WeatherSubscribtion(this.bot),
            new commands.TaskCommand(this.bot),
            new commands.SuggestCommand(this.bot),
        ];

        this.commands.forEach(command => {
            command.handle();
        });

        await this.bot.launch();
    }
}
