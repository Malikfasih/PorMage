import Manager from "../models/manager.js";

// Create a new manager
export const createManager = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //  Check if manager already registered
    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res
        .status(400)
        .json({ error: "Manager with this email already exists" });
    }

    // Create Manager
    const manager = new Manager({ name, email });
    await manager.save();

    res.status(201).json({
      success: true,
      message: "Manager created successfully",
      manager,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get all managers
export const getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find();
    res.status(200).json({ success: true, managers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Update manager
export const editManager = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //   Update manager
    const manager = await Manager.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }

    res.status(200).json({
      success: true,
      message: "Manager updated successfully",
      manager,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get Manager by Id
export const getManagerById = async (req, res) => {
  const { id } = req.params;

  try {
    const manager = await Manager.findById(id);

    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }

    res.status(200).json({ success: true, manager });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
