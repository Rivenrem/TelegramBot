import { Telegraf } from "telegraf";
import { MyContext } from "../context/context.interface";

export abstract class Command {
  constructor(public bot: Telegraf<MyContext>) {}

  abstract handle(): void;
}
