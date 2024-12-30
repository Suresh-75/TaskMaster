const {
  handleApp,
  handleLogin,
  handleSignUp,
  isAuthenticated,
} = require("./Controllers/Auth");
const {
  addTaskToUser,
  handleGetTasks,
  deleteTask,
  updateTask,
  getSummary,
} = require("./Controllers/TaskOpp");
const express = require("express");
const { default: mongoose } = require("mongoose");
const { configDotenv } = require("dotenv");
configDotenv({ path: "./.env" });
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ status: "start" });
});
app.post("/login", handleLogin);
app.post("/signUp", handleSignUp);
app.post("/addTask", addTaskToUser);
app.get("/getTasks/:userID", handleGetTasks);

app.get("/getSummary/:userID", getSummary);
app.patch("/deleteTask/:userID", deleteTask);
app.put("/updateTask/:taskId", updateTask);
app.listen(8080, () => {
  console.log("Listening on port 8080");
});
app.get("/test", (req, res) => {
  res.json({ status: "end" });
});
app.get("/*", (req, res) => {
  res.json({ status: "end" });
});
const port = process.env.PORT;
const DB = process.env.MongoDbURL.replace(
  "<db_password>",
  process.env.PASSWORD
);
mongoose
  .connect(
    "mongodb+srv://Suresh:120@cluster.s5aefqf.mongodb.net/TaskMaster?retryWrites=true&w=majority&appName=Cluster"
  )
  .then(() => {
    console.log("connected to database");
  });
