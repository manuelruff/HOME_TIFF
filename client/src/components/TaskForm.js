import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const success = await onAddTask(newTask);
      if (success) {
        setNewTask("");
      }
      else {
        alert("Failed to add task, please try again");
      }
    }
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
      <TextField
        fullWidth
        label="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        variant="outlined"
        multiline
        minRows={2} 
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
