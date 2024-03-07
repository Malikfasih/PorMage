import express from "express";
import {
  createProject,
  getAllProjects,
  editProject,
  deleteProject,
} from "../controllers/projects.js";

const router = express.Router();

// create project
router.post("/create-project", createProject);

// get All projects
router.get("/get-projects", getAllProjects);

// edit project
router.patch("/edit-project/:id", editProject);

// delete project
router.delete("/delete-project/:id", deleteProject);

export default router;
