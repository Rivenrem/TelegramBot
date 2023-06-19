import schedule, { Job } from 'node-schedule';

import { MyContext } from '../types/context';

const rule = new schedule.RecurrenceRule();

export function createReminde(
    context: MyContext,
    HH: string,
    MM: string,
    task: string,
): Job {
    rule.tz = 'Europe/Minsk';
    rule.minute = MM;
    rule.hour = HH;
    return schedule.scheduleJob(rule, async () => {
        if (context.session.chatID) {
            await context.telegram.sendMessage(
                context.session.chatID,
                `Reminder: ${task}`,
            );
        }
    });
}
