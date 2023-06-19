import { Markup } from 'telegraf';

import { Command } from '../classes/command.class';
import { constants } from '../constants/index';
import { taskRepository } from '../repositories/index';
import { deleteTask } from '../services/task.service';
import { ICallback } from '../types/telegrafContextCallback';

export class TaskCommand extends Command {
    handle(): void {
        this.bot.command(constants.Commands.TASK, async context => {
            await context.reply(constants.Task.addTask, {
                ...Markup.inlineKeyboard([
                    Markup.button.callback(
                        'Get all my tasks 📝',
                        'getAllTasks',
                    ),
                    Markup.button.callback('Add new task ✏️', 'addNewTask'),
                ]),
            });
        });

        this.bot.action('getAllTasks', async context => {
            if (!context.session.dbObjectID) {
                await context.reply(constants.Errors.noTasks, {
                    ...Markup.inlineKeyboard([
                        Markup.button.callback('yes', 'addNewTask'),
                    ]),
                });

                return;
            }

            const response = await taskRepository.findTasksById(
                context.session.dbObjectID,
            );

            if (response.tasksArray.length === 0) {
                await context.reply(constants.Errors.noTasks, {
                    ...Markup.inlineKeyboard([
                        Markup.button.callback('yes', 'addNewTask'),
                    ]),
                });

                return;
            }

            await context.reply('Your tasks:');

            response.tasksArray.map(async (task: string) => {
                await context.reply(`📌 ${task}`, {
                    ...Markup.inlineKeyboard([
                        Markup.button.callback('Delete task ❌', 'deleteTask'),
                        Markup.button.callback(
                            'Add reminder ⏰',
                            'remindAboutTask',
                        ),
                    ]),
                });
            });
        });

        this.bot.action('addNewTask', async context => {
            await context.scene.enter(constants.Scenes.ADD_TASK_SCENE);
        });

        this.bot.action('deleteTask', async context => {
            const callback = context.callbackQuery.message as ICallback;
            const taskToDelete = callback.text;

            if (context.session.dbObjectID) {
                await deleteTask(context.session.dbObjectID, taskToDelete);

                if (context.session.tasksToRemind?.includes(taskToDelete)) {
                    const index = context.session.tasksToRemind.findIndex(
                        e => e === taskToDelete,
                    );
                    const newTasksToRemind = context.session.tasksToRemind
                        .slice(0, index)
                        .concat(context.session.tasksToRemind.slice(index + 1));

                    context.session.tasksToRemind = [...newTasksToRemind];
                }

                await context.deleteMessage(
                    context.callbackQuery.message?.message_id,
                );
            }
        });

        this.bot.action('remindAboutTask', async context => {
            const callback = context.callbackQuery.message as ICallback;
            const taskToRemind = callback.text;

            context.session.tasksToRemind = context.session.tasksToRemind
                ? [...context.session.tasksToRemind, taskToRemind]
                : [taskToRemind];

            await context.scene.enter(constants.Scenes.REMIND_TASK_SCENE);
        });
    }
}
