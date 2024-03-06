import taskModel from "../models/task.js";
import projectModel from "../models/project.js";

export const createTask = async (req, res) => {
  const { projectId } = req.params;
  const { description, startDate, endDate, status } = req.body;
  //   console.log("req fields", name, manager, description, startDate, endDate);
  console.log("projectID:", projectId);

  try {
    // validation
    if (!description || !startDate || !endDate || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create task
    const task = new taskModel({ ...req.body });
    await task.save();

    // Associate task with project
    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.tasks.push(task._id);
    await project.save();

    res.status(201).send({
      success: true,
      message: "task created successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating a new task",
    });
  }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({}).limit(10).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: tasks.length,
      message: "All tasks",
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

// Edit task
export const editTask = async (req, res) => {
  try {
    const { description, startDate, endDate, status } = req.body;
    // console.log("fields:", name, manager, description, startDate, endDate);
    // console.log("param id:", req.params.id);

    //validation
    if (!description || !startDate || !endDate || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update task
    const tasks = await taskModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "task Updated Successfully",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in editing task",
    });
  }
};
