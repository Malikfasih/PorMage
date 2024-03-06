import express from "express";
import { createTask, getAllTasks, editTask } from "../controllers/tasks.js";

const router = express.Router();

// create Task
router.post("/project/:projectId/create-task", createTask);

// get All Tasks
router.get("/get-tasks", getAllTasks);

// edit Task
router.patch("/edit-task/:id", editTask);

export default router;
