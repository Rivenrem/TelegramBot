import { Context, Scenes } from "telegraf";
import { ScheduledTask } from "node-cron";

export interface sessionData extends Scenes.WizardSession {
  subscribedLocation?: string | undefined;
  subscrubeTask?: ScheduledTask;
  chatID?: number;
}
export interface MyContext extends Scenes.WizardContext, Context {
  session: sessionData;
}
