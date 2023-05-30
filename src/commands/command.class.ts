import { Telegraf } from "telegraf";
import { Scenes } from "telegraf";
// import { IBotContext } from "../context/context.interface";

export abstract class Command {
  constructor(public bot: Telegraf<Scenes.WizardContext>) {}

  abstract handle(): void;
}
