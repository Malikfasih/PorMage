import express from "express";
import {
  createProject,
  getAllProjects,
  editProject,
} from "../controllers/projects.js";

const router = express.Router();

// create project
router.post("/create-project", createProject);

// get All projects
router.get("/get-projects", getAllProjects);

// edit project
router.patch("/edit-project/:id", editProject);

export default router;
