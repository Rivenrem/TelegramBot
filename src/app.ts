import { Telegraf } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { WeatherCommand } from "./commands/weather.commmand";
import { PhotoCommand } from "./commands/photo.command";
import { HelpCommand } from "./commands/help.command";
import LocalSession from "telegraf-session-local";

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("BOT_TOKEN"));
    this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());
  }

  init() {
    this.commands = [
      new HelpCommand(this.bot),
      new PhotoCommand(this.bot, "cat", this.configService),
      new PhotoCommand(this.bot, "dog", this.configService),
      new StartCommand(this.bot),
      new WeatherCommand(this.bot, this.configService),
    ];
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
