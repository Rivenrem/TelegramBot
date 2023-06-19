import { Task, TaskClass } from '../models/task';

const findTasksById = async (objectId: string): Promise<TaskClass> => {
    const task = await Task.findById(objectId);

    if (!task) throw new Error('Task is not found');

    return task;
};

const createTask = async (taskData: TaskClass): Promise<string> => {
    const task = new Task(taskData);

    await task.save();

    return task.id as string;
};

const updateTasks = async (
    objectId: string,
    newTasks: Array<string>,
): Promise<void> => {
    await Task.findByIdAndUpdate(objectId, {
        tasksArray: newTasks,
    });
};

export const taskRepository = { createTask, findTasksById, updateTasks };
