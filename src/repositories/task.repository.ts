import { Task, TaskClass } from "models/task";

const findById = async (objectId: string): Promise<TaskClass> => {
  const task = await Task.findById(objectId);

  if (!task) throw new Error("Task is not found");

  return task;
};

const create = (taskData: TaskClass): TaskClass => {
  const task = new Task(taskData);

  task.save();

  return task;
};

const update = (objectId: string, newTasks: Array<string>): void => {
  Task.findByIdAndUpdate(objectId, {
    tasksArray: newTasks,
  });
};

export default { findById, create, update };
