const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { title, username } = req.body; 
    const task = new Task({ title, user: username }); 
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get all tasks for user
router.get("/tasks", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(401).json({ error: "Unauthorized: Username is required" });
    }
    const tasks = await Task.find({ user: username });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Update a task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const task = await Task.findByIdAndUpdate(id,{ title, completed },{ new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});
  
module.exports = router;
