import { Scenes, Telegraf } from "telegraf";
import { MyContext } from "./context/context.interface";
import LocalSession from "telegraf-session-local";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { Command } from "./commands/command.class";
import { weatherScene } from "./scenes/weather.scene";
import { subscribeScene } from "./scenes/subscrube.scene";
import { Stage } from "telegraf/typings/scenes";

import { StartCommand } from "./commands/start.command";
import { WeatherCommand } from "./commands/weather.commmand";
import { PhotoCommand } from "./commands/photo.command";
import { HelpCommand } from "./commands/help.command";
import { WeatherSubscribtion } from "./commands/subscrube.weather.command";

const stage = new Stage<MyContext>([weatherScene, subscribeScene]);
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
    this.commands = [
      new HelpCommand(this.bot),
      new PhotoCommand(this.bot, "cat"),
      new PhotoCommand(this.bot, "dog"),
      new StartCommand(this.bot),
      new WeatherCommand(this.bot),
      new WeatherSubscribtion(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
