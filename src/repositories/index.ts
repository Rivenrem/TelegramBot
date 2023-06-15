import { Task, TaskClass } from '../models/task';

const findById = async (objectId: string): Promise<TaskClass> => {
    const task = await Task.findById(objectId);

    if (!task) throw new Error('Task is not found');

    return task;
};

const create = async (taskData: TaskClass): Promise<string> => {
    const task = new Task(taskData);

    await task.save();

    return task.id as string;
};

const update = async (
    objectId: string,
    newTasks: Array<string>,
): Promise<void> => {
    await Task.findByIdAndUpdate(objectId, {
        tasksArray: newTasks,
    });
};

export default { findById, create, update };
