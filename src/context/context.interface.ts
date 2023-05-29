import { Context } from "telegraf"

export interface SessionData {
  location: string;

}

export interface IBotContext extends Context {

  session: SessionData;
}