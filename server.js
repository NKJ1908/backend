import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";
import tasksRouter from "./routes/tasks.js";
import authRouter from "./routes/auth.js"
import { logger } from "./middlwares/logger.js";
import cors from "cors";
import connectDB from "./db.js";

connectDB()
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://taskflow-three-zeta-20.vercel.app"
    ]
  })
);
app.use(express.json());
app.use(logger);
app.use("/tasks", tasksRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(chalk.green(`Serveur demarré sur le port ${port}`));
});
