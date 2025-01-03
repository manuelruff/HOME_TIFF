import React, { useState } from "react";
import { Box, TextField, Button, Paper } from "@mui/material";

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const success = await onAddTask(newTask);
      if (success) {
        setNewTask("");
      }
    }
  };

  return (
    <Paper
      sx={{
        padding: 4,
        textAlign: "center",
        boxShadow: 3,
        borderRadius: 2,
        width: "100%",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
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
    </Paper>
  );
};

export default TaskForm;
