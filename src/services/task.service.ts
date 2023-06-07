import taskRepository from "../repositories/task.repository";

export const update = async (objectId: string, newTask: string) => {
  const task = await taskRepository.findById(objectId);
  const tasksArray = task.tasksArray;

  taskRepository.update(objectId, [...tasksArray, newTask]);
};

export const deleteTask = async (objectId: string, taskToDelete: string) => {
  const task = await taskRepository.findById(objectId);
  const tasksArray = task.tasksArray;

  tasksArray.splice(tasksArray.indexOf(taskToDelete), 1);
  taskRepository.update(objectId, tasksArray);
};
