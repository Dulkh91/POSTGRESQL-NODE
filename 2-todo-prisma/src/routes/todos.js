import express from "express";
import { createTodo, 
    getTodos, 
    getTodoById,
    updateTodo,
    deleteTodo
    } from "../controllers/todosController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);

router.get("/:id", getTodoById);
router.patch("/:id", updateTodo); 
router.delete('/:id', deleteTodo);

export default router;
