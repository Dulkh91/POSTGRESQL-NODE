import { json } from "node:stream/consumers";
import prisma from "../../lib/prisma.js";

export async function getTodos(req, res) {
  try {
    const todos = await prisma.todo.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    return res.json(todos);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return res.status(500).json({ message: "Failed to fetch todos" });
  }
}


export async function getTodoById(req, res) {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id < 1){
      return res.status(400).json({message: "Invalid todo id"});
    }
    
    try {
        const todo = await prisma.todo.findUnique({
          where: {id},
          include: {user: true}
        });
        
        if(!todo){
          return res.status(404).json({
            message: "Todo not found"
          });
        }

        return res.json(todo)

    } catch (error) {
        console.error("Failed to fetch todo:", error);
        return res.status(500).json({ message: "Failed to fetch todo" });
    }
}



export async function createTodo(req, res) {
  const { title, description, priority = "medium", userId } = req.body ?? {};
  const parsedUserId = Number(userId);

  if (
    typeof title !== "string" ||
    !title.trim() ||
    !Number.isInteger(parsedUserId) ||
    parsedUserId < 1
  ) {
    return res.status(400).json({
      message: "A title and a valid userId are required",
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ message: "Description must be a string" });
  }

  if (typeof priority !== "string" || !priority.trim()) {
    return res.status(400).json({ message: "Priority must be a non-empty string" });
  }

  try {
    const todo = await prisma.todo.create({
      data: {
        title: title.trim(),
        ...(description === undefined ? {} : { description }),
        priority: priority.trim(),
        user: { connect: { id: parsedUserId } },
      },
      include: { user: true },
    });

    return res.status(201).json(todo);
  } catch (error) {
    console.error("Failed to create todo:", error);
    if (error.code === "P2025" || error.code === "P2003") {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(500).json({ message: "Failed to create todo" });
  }
}


export async function updateTodo(req,res) {
    const id = Number(req.params.id);
    const { title, description, priority, completed } = req.body ?? {};

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    const data = {};
    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ message: "Title must be a non-empty string" });
      }
      data.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({ message: "Description must be a string" });
      }
      data.description = description;
    }

    if (priority !== undefined) {
      if (typeof priority !== "string" || !priority.trim()) {
        return res.status(400).json({ message: "Priority must be a non-empty string" });
      }
      data.priority = priority.trim();
    }
    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({ message: "Completed must be true or false" });
      }
      data.completed = completed;
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Provide at least one field to update" });
    }

    try {
        const todoUpdate = await prisma.todo.update({ where: { id }, data });

      return res.status(200).json(todoUpdate);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Todo not found" });
      }
      console.error("Failed to update todo:", error);
      return res.status(500).json({ message: "Failed to update todo" });
    }
}


export async function deleteTodo(req,res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    try {
        await prisma.todo.delete({ where: { id } });
        return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
          return res.status(404).json({ message: "Todo not found" });
        }
        console.error("Failed to delete todo:", error);
        return res.status(500).json({ message: "Failed to delete todo" });
    }
}
