import express from "express";
import {
  createTask,
  getAllTasks,
  editTask,
  deleteTask,
} from "../controllers/tasks.js";

const router = express.Router();

// Create Task
router.post("/project/:projectId/create-task", createTask);

// Get All Tasks
router.get("/get-tasks", getAllTasks);

// Edit Task
router.patch("/edit-task/:id", editTask);

// Delete Task
router.delete("/delete-task/:id", deleteTask);

export default router;
