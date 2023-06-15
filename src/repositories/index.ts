import { Task, TaskClass } from '../models/task';

const findById = async (objectId: string): Promise<TaskClass> => {
    const task = await Task.findById(objectId);

    if (!task) throw new Error('Task is not found');

    return task;
};

const create = async (taskData: TaskClass): Promise<string> => {
    const task = new Task(taskData);

    await task.save();
    console.log('saved');

    // eslint-disable-next-line no-underscore-dangle
    return task._id.toString();
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
