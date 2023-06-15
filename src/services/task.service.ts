import taskRepository from '../repositories';

export const update = async (objectId: string, newTask: string) => {
    try {
        const task = await taskRepository.findById(objectId);
        const { tasksArray } = task;
        await taskRepository.update(objectId, [...tasksArray, newTask]);
    } catch {}
};

export const deleteTask = async (objectId: string, taskToDelete: string) => {
    try {
        const task = await taskRepository.findById(objectId);
        const { tasksArray } = task;

        tasksArray.splice(tasksArray.indexOf(taskToDelete), 1);
        await taskRepository.update(objectId, tasksArray);
    } catch {}
};
