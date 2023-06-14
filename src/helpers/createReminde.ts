import schedule, { Job } from 'node-schedule';
import { MyContext } from '#types/context.d.ts';

const rule = new schedule.RecurrenceRule();

export default function reminderTask(
    ctx: MyContext,
    HH: string,
    MM: string,
    task: string,
): Job {
    rule.tz = 'Europe/Minsk';
    rule.minute = MM;
    rule.hour = HH;
    return schedule.scheduleJob(rule, function () {
        if (ctx.session.chatID) {
            ctx.telegram.sendMessage(ctx.session.chatID, `Reminder: ${task}`);
        }
    });
}
