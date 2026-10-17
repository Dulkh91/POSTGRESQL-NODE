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
