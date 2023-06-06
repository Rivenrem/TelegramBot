import { Task, TaskClass } from "../models/task";
import { MyContext } from "../src/context/context.interface";
import message from "../src/constants/constants";

const findById = async (objectId: string): Promise<TaskClass> => {
  const task = await Task.findById(objectId);

  if (!task) throw new Error("Task is not found");
  return task;
};

const create = async (
  taskData: TaskClass,
  ctx: MyContext
): Promise<TaskClass> => {
  const task = new Task(taskData);

  task.save();
  ctx.reply(message.done);

  return task;
};

const update = async (
  objectId: string,
  newTasks: Array<string>
): Promise<void> => {
  await Task.findByIdAndUpdate(objectId, {
    tasksArray: newTasks,
  });
};

export default { findById, create, update };
