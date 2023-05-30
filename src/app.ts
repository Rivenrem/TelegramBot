import LocalSession from "telegraf-session-local";
import { Telegraf, Scenes } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { WeatherCommand } from "./commands/weather.commmand";
import { PhotoCommand } from "./commands/photo.command";
import { HelpCommand } from "./commands/help.command";
import { weatherScene } from "./scenes/weather.scene";
import { Stage } from "telegraf/typings/scenes";

const stage = new Stage<Scenes.WizardContext>([weatherScene]);

class Bot {
  bot: Telegraf<Scenes.WizardContext>;
  commands: Command[] = [];
  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<Scenes.WizardContext>(
      this.configService.get("BOT_TOKEN")
    );
    this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());
    this.bot.use(stage.middleware());
  }

  init() {
    this.commands = [
      new HelpCommand(this.bot),
      new PhotoCommand(this.bot, "cat"),
      new PhotoCommand(this.bot, "dog"),
      new StartCommand(this.bot),
      new WeatherCommand(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
