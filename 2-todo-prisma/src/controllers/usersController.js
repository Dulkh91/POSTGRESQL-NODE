import prisma from "../../lib/prisma.js";


export async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany();
        return res.json(users);
    } catch (error) {
        res.status(500).json({
        message: "Failed to fetch users",
    });
    }
}


export async function createUser(req, res) {
  try {
    const { name, email } = req.body ?? {};

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Failed to create user:", error);

    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (error.name === "PrismaClientInitializationError") {
      return res.status(503).json({
        message: "Cannot connect to PostgreSQL. Make sure the database is running at localhost:5432.",
      });
    }

    res.status(500).json({
      message: "Failed to create user",
      detail: error.message,
    });
  }
};

