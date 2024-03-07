import projectModel from "../models/project.js";
import taskModel from "../models/task.js";
import nodemailer from "nodemailer";

export const createProject = async (req, res) => {
  const { name, manager, description, startDate, endDate } = req.body;

  try {
    // Validation
    if (!name || !manager || !description || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create project
    const project = new projectModel({ ...req.body });

    // Send email notification to associated team
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: "associated-team@example.com",
      subject: "New Project Created",
      text: `A new project "${name}" has been created.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending project creation email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).send({
      success: true,
      message: "Project created successfully",
      project,
    });

    await project.save();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating a new Project",
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const page = req.query.page || 1; // Default to page 1 if not provided
    const limit = req.query.limit || 8; // Default to limit of 8 if not provided

    const projects = await projectModel
      .find({})
      .skip((page - 1) * limit) // Calculate the number of documents to skip based on page and limit
      .limit(limit)
      .populate("tasks")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      totalCount: projects.length,
      message: "All projects",
      projects,
    });
  } catch (error) {
    console.log(error);
  }
};

// Edit project
export const editProject = async (req, res) => {
  try {
    const { name, manager, description, startDate, endDate } = req.body;

    //Validation
    if (!name || !manager || !description || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update project
    const projects = await projectModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Project Updated Successfully",
      projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in editing Project",
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  console.log("delete id:", req.params.id);
  try {
    const project = await projectModel
      .findById(req.params.id)
      .populate("tasks");

    console.log("project to delete:", project);

    // If project has associated tasks, delete them
    if (project.tasks && project.tasks.length > 0) {
      for (const taskId of project.tasks) {
        await taskModel.findByIdAndDelete(taskId);
      }
    }

    // Delete the project itself
    await projectModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Project",
      error,
    });
  }
};
