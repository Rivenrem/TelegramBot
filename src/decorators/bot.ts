import { Telegraf } from "telegraf";
import { Stage } from "telegraf/typings/scenes";
import LocalSession from "telegraf-session-local";

import Command from "../commands/command.class";
import commands from "../commands/index";

import scenes from "../scenes/index";

import { IConfigService } from "../config/config.interface";
import { MyContext } from "../context/context.interface";

const stage = new Stage<MyContext>(scenes);
const localSession = new LocalSession({ database: "sessions.json" });

export default class Bot {
  bot: Telegraf<MyContext>;
  commands: Command[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<MyContext>(this.configService.get("BOT_TOKEN"));
    this.bot.use(localSession.middleware());
    this.bot.use(stage.middleware());
  }

  init() {
    this.commands = [
      new commands.HelpCommand(this.bot),
      new commands.PhotoCommand(this.bot, "cat"),
      new commands.PhotoCommand(this.bot, "dog"),
      new commands.StartCommand(this.bot),
      new commands.WeatherCommand(this.bot),
      new commands.WeatherSubscribtion(this.bot),
      new commands.TaskCommand(this.bot),
      new commands.SuggestCommand(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}
