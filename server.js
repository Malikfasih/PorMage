import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./db/connect.js";

import projectRoute from "./routes/projects.js";
import taskRoute from "./routes/tasks.js";
import managerRoute from "./routes/manager.js";

const app = express();
app.use(cors());

dotenv.config();

// middleware
app.use(express.json({ limit: "30mb", extended: true }));

// routes
app.use("/projects", projectRoute);
app.use("/tasks", taskRoute);
app.use("/managers", managerRoute);

const PORT = 8080;

// Test
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ProMage</h1>");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
