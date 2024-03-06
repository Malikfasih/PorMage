import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./db/connect.js";

import project from "./routes/projectRoute.js";
import task from "./routes/taskRoute.js";

const app = express();

dotenv.config();

// middleware
app.use(express.json({ limit: "30mb", extended: true }));

app.use(cors());

// routes
app.use("/project", project);
app.use("/task", task);
// app.use("/project", (req, res) => {
//   res.status(200).send({ message: "Request hitting this route" });
// });

const PORT = 8080;

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
