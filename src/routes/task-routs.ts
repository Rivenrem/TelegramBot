import express from "express";

import {
  getTasks,
  getTaskById,
  deleteTask,
  addTask,
  updateTask,
} from "../../controllers/task-controller";

export const taskRouter = express.Router();

taskRouter.use(express.json());
taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.delete("/:id", deleteTask);
taskRouter.post("/", addTask);
taskRouter.patch("/:id", updateTask);
