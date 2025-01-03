import React, { useState } from "react";
import { Box, TextField, Button,Alert,CircularProgress } from "@mui/material";

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (newTask.trim()) {
      const success = await onAddTask(newTask);
      if (success) {
        setNewTask("");
      }
      else {
        setError("Failed to add task, please try again.");
      }
    }
    else {
      setError("Task cannot be empty.");
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: 1,
        justifyContent: "center",
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        label="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        variant="outlined"
        multiline
        minRows={2} 
      />
      {loading ? (
              <CircularProgress/>
      ) : (
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
      )}
    </Box>
  );
};

export default TaskForm;
