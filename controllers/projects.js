import projectModel from "../models/project.js";

export const createProject = async (req, res) => {
  const { name, manager, description, startDate, endDate } = req.body;
  //   console.log("req fields", name, manager, description, startDate, endDate);

  try {
    // Validation
    if (!name || !manager || !description || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create project
    const project = new projectModel({ ...req.body });
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
    const projects = await projectModel
      .find({})
      .limit(12)
      .populate("tasks")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: projects.length,
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
    // console.log("fields:", name, manager, description, startDate, endDate);
    // console.log("param id:", req.params.id);

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

// delete project
// export const deleteProject = async (req, res) => {
//   try {
//     await projectModel.findByIdAndDelete(req.params.id);
//     res.status(200).send({
//       success: true,
//       message: "Project deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while deleting Project",
//       error,
//     });
//   }
// };
