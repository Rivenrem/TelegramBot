import { Command } from 'Classes/command.class';
import { constants } from 'Constants/index';
import { taskRepository } from 'Repositories/index';
import { deleteTask } from 'Services/task.service';
import { Markup } from 'telegraf';
import { ICallback } from 'Types/telegrafContextCallback';

export class TaskCommand extends Command {
    handle(): void {
        this.bot.command(constants.CommandsNames.TASK, async context => {
            await context.reply(constants.commandsText.Task.addTask, {
                ...Markup.inlineKeyboard([
                    Markup.button.callback(
                        constants.commandsText.Task.getButton,
                        'getAllTasks',
                    ),
                    Markup.button.callback(
                        constants.commandsText.Task.addButton,
                        'addNewTask',
                    ),
                ]),
            });
        });

        this.bot.action('getAllTasks', async context => {
            if (!context.session.dbObjectID) {
                await context.reply(constants.Errors.noTasks, {
                    ...Markup.inlineKeyboard([
                        Markup.button.callback(
                            constants.commandsText.Task.yesButton,
                            'addNewTask',
                        ),
                    ]),
                });

                return;
            }

            try {
                const response = await taskRepository.findTasksById(
                    context.session.dbObjectID,
                );

                if (response.tasksArray.length === 0) {
                    await context.reply(constants.Errors.noTasks, {
                        ...Markup.inlineKeyboard([
                            Markup.button.callback(
                                constants.commandsText.Task.yesButton,
                                'addNewTask',
                            ),
                        ]),
                    });

                    return;
                }

                await context.reply('Your tasks:');

                response.tasksArray.map(async (task: string) => {
                    await context.reply(`📌 ${task}`, {
                        ...Markup.inlineKeyboard([
                            Markup.button.callback(
                                constants.commandsText.Task.deleteButton,
                                'deleteTask',
                            ),
                            Markup.button.callback(
                                constants.commandsText.Task.remindButton,
                                'remindAboutTask',
                            ),
                        ]),
                    });
                });
            } catch {
                await context.reply(constants.Errors.base);
            }
        });

        this.bot.action('addNewTask', async context => {
            try {
                await context.scene.enter(constants.Scenes.ADD_TASK_SCENE);
            } catch {
                await context.reply(constants.Errors.base);
            }
        });

        this.bot.action('deleteTask', async context => {
            const callback = context.callbackQuery.message as ICallback;
            const taskToDelete = callback.text;
            try {
                if (context.session.dbObjectID) {
                    await deleteTask(context.session.dbObjectID, taskToDelete);

                    if (context.session.tasksToRemind?.includes(taskToDelete)) {
                        const index = context.session.tasksToRemind.findIndex(
                            e => e === taskToDelete,
                        );
                        const newTasksToRemind = context.session.tasksToRemind
                            .slice(0, index)
                            .concat(
                                context.session.tasksToRemind.slice(index + 1),
                            );

                        context.session.tasksToRemind = [...newTasksToRemind];
                    }

                    await context.deleteMessage(
                        context.callbackQuery.message?.message_id,
                    );
                }
            } catch {
                await context.reply(constants.Errors.base);
            }
        });

        this.bot.action('remindAboutTask', async context => {
            const callback = context.callbackQuery.message as ICallback;
            const taskToRemind = callback.text;

            context.session.tasksToRemind = context.session.tasksToRemind
                ? [...context.session.tasksToRemind, taskToRemind]
                : [taskToRemind];

            try {
                await context.scene.enter(constants.Scenes.REMIND_TASK_SCENE);
            } catch {
                await context.reply(constants.Errors.base);
            }
        });
    }
}
