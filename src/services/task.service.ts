import { taskRepository } from 'Repositories/index';

export const updateTasks = async (objectId: string, newTask: string) => {
    try {
        const task = await taskRepository.findTasksById(objectId);
        const { tasksArray } = task;
        await taskRepository.updateTasks(objectId, [...tasksArray, newTask]);
    } catch {}
};

export const deleteTask = async (objectId: string, taskToDelete: string) => {
    try {
        const task = await taskRepository.findTasksById(objectId);
        const { tasksArray } = task;

        if (tasksArray.includes(taskToDelete)) {
            tasksArray.splice(
                tasksArray.indexOf(taskToDelete.substring(3).toString()),
                1,
            );

            await taskRepository.updateTasks(objectId, tasksArray);
        }
    } catch {}
};
