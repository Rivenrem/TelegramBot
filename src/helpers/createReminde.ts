import schedule, { Job } from 'node-schedule';
import { MyContext } from 'Types/context';

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
        if (
            context.session.chatID &&
            context.session.tasksToRemind?.includes(task)
        ) {
            await context.telegram.sendMessage(
                context.session.chatID,
                `Reminder: ${task}`,
            );

            const indexOfTask = context.session.tasksToRemind.findIndex(
                e => e === task,
            );

            const newTasksToRemind = context.session.tasksToRemind.splice(
                indexOfTask + 1,
                1,
            );

            context.session.tasksToRemind = [...newTasksToRemind];
        }
    });
}
