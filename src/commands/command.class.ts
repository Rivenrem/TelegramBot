import { Telegraf } from "telegraf";
import { Scenes } from "telegraf";

export abstract class Command {
  constructor(public bot: Telegraf<Scenes.WizardContext>) {}

  abstract handle(): void;
}
