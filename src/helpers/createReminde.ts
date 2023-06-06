import schedule from "node-schedule";
import { MyContext } from "../context/context.interface";

export const reminderTask = (
  ctx: MyContext,
  HH: string,
  MM: string,
  task: string
) =>
  schedule.scheduleJob(`${MM} ${HH} * * *`, () => {
    if (ctx.session.chatID) {
      ctx.telegram.sendMessage(ctx.session.chatID, `Reminder: ${task}`);
    }
  });
