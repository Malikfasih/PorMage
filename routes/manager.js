import express from "express";
import {
  createManager,
  editManager,
  getAllManagers,
  getManagerById,
} from "../controllers/manager.js";

const router = express.Router();

// Create Task
router.post("/create-manager", createManager);

// Get All Tasks
router.get("/get-managers", getAllManagers);

// Get Manager by Id
router.get("/get-manager/:id", getManagerById);

// Edit Task
router.patch("/edit-manager/:id", editManager);

export default router;
