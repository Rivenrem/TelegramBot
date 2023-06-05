import { Request, Response } from "express";
import { Task } from "../models/task";
import { Error } from "mongoose";

export const getTasks = (req: Request, res: Response) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => handleError(res, error));
};

export const getTaskById = (req: Request, res: Response) => {
  Task.findById(req.params.id)
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => handleError(res, error));
};

export const deleteTask = (req: Request, res: Response) => {
  Task.findByIdAndDelete(req.params.id)
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => handleError(res, error));
};

export const addTask = (req: Request, res: Response) => {
  const task = new Task(req.body);
  task
    .save()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => handleError(res, error));
};

export const updateTask = (req: Request, res: Response) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => handleError(res, error));
};

const handleError = (res: Response, error: Error) => {
  res.status(500).json({ error });
};
