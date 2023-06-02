import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../config/database.service";
import Task from "../../models/taskModel";

export const taskRouter = express.Router();

taskRouter.use(express.json());

taskRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const task = await collections.ToDos?.find({}).toArray();

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const task = await collections.ToDos?.findOne(query);

    if (task) {
      res.status(200).send(task);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

taskRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newTask = req.body as Task;
    const result = await collections.ToDos?.insertOne(newTask);

    result
      ? res
          .status(201)
          .send(`Successfully created a new game with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new game.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

taskRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedTask: Task = req.body as Task;
    const query = { _id: new ObjectId(id) };

    const result = await collections.ToDos?.updateOne(query, {
      $set: updatedTask,
    });

    result
      ? res.status(200).send(`Successfully updated task with id ${id}`)
      : res.status(304).send(`Task with id: ${id} not updated`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

taskRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.ToDos?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed game with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove game with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Game with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
