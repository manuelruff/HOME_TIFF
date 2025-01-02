const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { name, password } = req.body;
    // check if username taken
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const user = new User({ name, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get a single user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Login a user
router.post("/users/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    // do in front later
    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required" });
    }
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ error: "Wrong username or password" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "Wrong username or password" });
    }
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
