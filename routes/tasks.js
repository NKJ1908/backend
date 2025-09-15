import express from "express";
import { getTasks } from "../controllers/tasks/getTasks.js";
import { postTask } from "../controllers/tasks/postTask.js";
import { editTask } from "../controllers/tasks/editTask.js";
import { deleteTask } from "../controllers/tasks/deleteTask.js";
import authVerif from "../middlwares/auth.js";
import { deleteTasks } from "../controllers/tasks/deleteTasks.js";





const router = express.Router();

router.get("/",authVerif,getTasks);
router.post("/",authVerif, postTask);
router.patch("/:id",authVerif, editTask);
router.delete("/:id",authVerif, deleteTask);
router.delete("/",authVerif, deleteTasks);

export default router;
