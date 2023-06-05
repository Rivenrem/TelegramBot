import { Context, Scenes } from "telegraf";
import { ObjectId } from "mongoose";

export interface sessionData extends Scenes.WizardSession {
  subscribedLocation?: string | undefined;
  chatID?: number;
  dbObjectID?: ObjectId;
}
export interface MyContext extends Scenes.WizardContext, Context {
  session: sessionData;
}
