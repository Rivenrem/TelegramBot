import { Telegraf } from "telegraf";
import { Stage } from "telegraf/typings/scenes";
import LocalSession from "telegraf-session-local";
import { MyContext } from "./src/context/context.interface";
import { ConfigService } from "./src/config/config.service";
import { IConfigService } from "./src/config/config.interface";

import { weatherScene } from "./src/scenes/weather.scene";
import { subscribeScene } from "./src/scenes/subscrube.scene";

import { Command } from "./src/commands/command.class";
import { HelpCommand } from "./src/commands/help.command";
import { PhotoCommand } from "./src/commands/photo.command";
import { StartCommand } from "./src/commands/start.command";
import { WeatherCommand } from "./src/commands/weather.commmand";
import { WeatherSubscribtion } from "./src/commands/subscrube-weather.command";
import { startServer } from "./server";
import { taskScene } from "./src/scenes/task.scene";
import { TaskCommand } from "./src/commands/task.command";

const stage = new Stage<MyContext>([weatherScene, subscribeScene, taskScene]);
const localSession = new LocalSession({ database: "sessions.json" });

class Bot {
  bot: Telegraf<MyContext>;
  commands: Command[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<MyContext>(this.configService.get("BOT_TOKEN"));
    this.bot.use(localSession.middleware());
    this.bot.use(stage.middleware());
  }

  init() {
    console.log("here im catacatcac");
    this.commands = [
      new HelpCommand(this.bot),
      new PhotoCommand(this.bot, "cat"),
      new PhotoCommand(this.bot, "dog"),
      new StartCommand(this.bot),
      new WeatherCommand(this.bot),
      new WeatherSubscribtion(this.bot),
      new TaskCommand(this.bot, this.configService),
    ];
    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();

startServer();
