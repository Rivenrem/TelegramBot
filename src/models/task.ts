import { ObjectId } from "mongodb";
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
export class TaskClass {
  constructor(public tasksArray: Array<string>, public chatID: number) {}
}

export const taskSchema = new Schema({
  objectID: ObjectId,
  tasksArray: [],

  chatID: {
    type: Number,
    required: true,
  },
});

export const Task = mongoose.model("Task", taskSchema);
