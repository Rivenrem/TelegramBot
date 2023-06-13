import schedule from "node-schedule";
import {MyContext} from "../../types/context";

const rule = new schedule.RecurrenceRule();
rule.tz = "Europe/Minsk";

export default function reminderTask(
  ctx: MyContext,
  HH: string,
  MM: string,
  task: string
): void {
  schedule.scheduleJob(`${MM} ${HH} * * *`, () => {
    if (ctx.session.chatID) {
      ctx.telegram.sendMessage(ctx.session.chatID, `Reminder: ${task}`);
    }
  });
}
