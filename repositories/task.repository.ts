import { ObjectId } from "mongoose";
import { Task, TaskClass } from "../models/task";
import { MyContext } from "../src/context/context.interface";
import { doneMessage } from "../src/constants/constants";

export const findById = async (objectId: ObjectId): Promise<TaskClass> => {
  const task = await Task.findById(objectId);

  if (!task) throw new Error("Task is not found");
  return task;
};

export const addTask = async (
  taskData: TaskClass,
  ctx: MyContext
): Promise<TaskClass> => {
  const task = new Task(taskData);
  task.save();
  ctx.reply(doneMessage);
  return task;
};

export const updateTask = async (taskData: TaskClass): Promise<TaskClass> => {
  const task = new Task(taskData);
  task.save();

  return task;
};
