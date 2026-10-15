
import "dotenv/config";
import express from "express";
import prisma from "./lib/prisma.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Express Server is running!");
});

app.get("/users", async(req,res)=>{
    try {
        const users = await prisma.user.findMany();
        res.json(users)
    } catch (error) {
        res.status(500).json({
        message: "Failed to fetch users",
    });
    }
})

// POST: បង្កើត User ថ្មី
app.post("/users", async(req, res) => {
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

    res.status(201).json(user);
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
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
