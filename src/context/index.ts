import { Context, Scenes } from "telegraf";

export interface sessionData extends Scenes.WizardSession {
  subscribedLocation?: string;
  chatID?: number;
  dbObjectID?: string;
  taskToRemind?: string;
}
export interface MyContext extends Scenes.WizardContext, Context {
  session: sessionData;
}
