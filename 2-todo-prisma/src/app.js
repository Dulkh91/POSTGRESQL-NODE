import express from "express";
import todosRouter from "./routes/todos.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Express Server is running!");
});


app.use("/todos", todosRouter);

app.use("/users", usersRouter);



app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
