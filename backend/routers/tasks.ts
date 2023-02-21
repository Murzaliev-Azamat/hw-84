import express from "express";
import mongoose from "mongoose";
import {TaskMutation} from "../types";
import Track from "../models/Task";
import auth, {RequestWithUser} from "../middleware/auth";
import TrackHistory from "../models/TrackHistory";
import Task from "../models/Task";

const tasksRouter = express.Router();

tasksRouter.get('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const tasks = await Task.find({user: user._id});
    return res.send(tasks);
  } catch (e) {
    return next(e);
  }
});


tasksRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  const taskData: TaskMutation = {
    user: user._id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };

  const task = new Task(taskData);

  try {
    await task.save();
    return res.send(task);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default tasksRouter;