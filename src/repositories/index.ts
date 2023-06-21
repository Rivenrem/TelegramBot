import { constants } from 'Constants/index';
import { Task, TaskClass } from 'Models/task';

const findTasksById = async (objectId: string): Promise<TaskClass> => {
    try {
        const task = await Task.findById(objectId);

        if (!task) throw new Error(constants.Errors.taskNotFound);

        return task;
    } catch {
        throw new Error();
    }
};

const createTask = async (taskData: TaskClass): Promise<string> => {
    try {
        const task = new Task(taskData);

        await task.save();

        return task.id as string;
    } catch {
        throw new Error();
    }
};

const updateTasks = async (
    objectId: string,
    newTasks: Array<string>,
): Promise<void> => {
    try {
        await Task.findByIdAndUpdate(objectId, {
            tasksArray: newTasks,
        });
    } catch {
        throw new Error();
    }
};

export const taskRepository = { createTask, findTasksById, updateTasks };
