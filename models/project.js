import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

export default mongoose.model("Project", ProjectSchema);
