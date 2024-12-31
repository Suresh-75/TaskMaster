const Task = require("../Models/Task");
const User = require("../Models/User");

exports.addTaskToUser = async (req, res) => {
  const { title, priority, startTime, endTime, status, userID } = req.body;
  const taskData = { title, priority, startTime, endTime, status };
  console.log(taskData);
  const task = new Task(taskData);
  await task.save();
  const user = await User.findById(userID);
  user.tasks.push(task._id);
  await user.save();
  res.json({ status: "success", task });
  console.log("Task added to user successfully");
};

exports.handleGetTasks = async (req, res) => {
  const { userID } = req.params;
  const { tasks } = await User.findById(userID);
  if (!tasks) {
    res.json({ status: "Success", taskObj: [] });
  }
  const taskObj = await Promise.all(
    tasks.map(async (task) => {
      const t = await Task.findById(task);
      return t || null;
    })
  );
  res.json({ status: "Success", taskObj });
};

exports.deleteTask = async (req, res) => {
  const { taskid } = req.body;
  const { userID } = req.params;
  const user = await User.findById(userID);
  user.tasks = user.tasks.filter((e) => {
    return e._id.toString() !== taskid;
  });
  await user.save();
  await Task.findByIdAndDelete(taskid);
  res.json({
    status: "success",
  });
};

exports.updateTask = async (req, res) => {
  const { updatedTaskData } = req.body;
  const { taskId } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.json({ status: "error", message: "Task not found" });
    }
    console.log(updatedTask);
    return res.json({ status: "success", task: updatedTask });
  } catch (error) {
    console.error(error);
    return res.json({ status: "error", message: "Error updating task" });
  }
};

exports.getSummary = async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID);
  console.log(user.tasks.length === 0);
  if (user.tasks.length === 0) {
    res.json({ status: "None" });
    return;
  }
  const taskObj = await Promise.all(
    user.tasks.map(async (task) => {
      const t = await Task.findById(task);
      return t || null;
    })
  );
  let completed = 0;
  let time = 0;
  let estTime = 0;
  taskObj.forEach((task) => {
    if (task.status) {
      const timeA = new Date(task.endTime);
      const timeB = new Date(task.startTime);
      completed++;
      time += (timeA.getTime() - timeB.getTime()) / (1000 * 60 * 60);
    } else {
      const timeA = new Date(task.endTime);
      const timeB = new Date(task.startTime);
      estTime += (timeA.getTime() - timeB.getTime()) / (1000 * 60 * 60);
    }
  });

  const timeElapsed =
    (Date.now() - new Date(taskObj[0].startTime).getTime()) / (1000 * 60 * 60);
  const summary = {
    totalTasks: user.tasks?.length,
    completedPercent: Math.floor((completed * 100) / user.tasks?.length),
    Avg: Math.floor(time / completed),
  };
  const summaryPending = {
    pendingTasks: user.tasks?.length - completed,
    timeElapsed: Math.floor(timeElapsed),
    estTime,
  };
  //   console.log(user);
  console.log(summaryPending);
  res.json({ summary, summaryPending });
};
