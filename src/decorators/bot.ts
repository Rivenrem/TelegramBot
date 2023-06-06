import { Telegraf } from "telegraf";
import { Stage } from "telegraf/typings/scenes";
import LocalSession from "telegraf-session-local";

import { Command } from "../commands/command.class";
import { HelpCommand } from "../commands/help.command";
import { PhotoCommand } from "../commands/photo.command";
import { StartCommand } from "../commands/start.command";
import { WeatherCommand } from "../commands/weather.commmand";
import { WeatherSubscribtion } from "../commands/subscrube-weather.command";
import { TaskCommand } from "../commands/task.command";
import { SuggestCommand } from "../commands/suggestPlace.command";

import { addTaskScene } from "../scenes/addTask.scene";
import { remindTaskScene } from "../scenes/remindTask.scene";
import { suggestScene } from "../scenes/suggest.scene";
import { weatherScene } from "../scenes/weather.scene";
import { subscribeScene } from "../scenes/subscrube.scene";

import { IConfigService } from "../config/config.interface";
import { MyContext } from "../context/context.interface";

const stage = new Stage<MyContext>([
  weatherScene,
  subscribeScene,
  addTaskScene,
  remindTaskScene,
  suggestScene,
]);
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
      new HelpCommand(this.bot),
      new PhotoCommand(this.bot, "cat"),
      new PhotoCommand(this.bot, "dog"),
      new StartCommand(this.bot),
      new WeatherCommand(this.bot),
      new WeatherSubscribtion(this.bot),
      new TaskCommand(this.bot),
      new SuggestCommand(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}
