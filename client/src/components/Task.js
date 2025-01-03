import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/fetchers";
import { Typography, Checkbox, Button, TextField, Box } from "@mui/material";

const Task = ({ task, onTaskDelete }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleCheckboxToggle = async () => {
    const updatedStatus = !isCompleted;
    const { success } = await updateTask(task._id, {
      completed: updatedStatus,
    });
    if (success) {
      setIsCompleted(updatedStatus);
    }
  };

  const handleDelete = async () => {
    const { success } = await deleteTask(task._id);
    if (success) {
      onTaskDelete(task._id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const { success } = await updateTask(task._id, { title: newTitle });
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper", 
        marginBottom: 1,
      }}
    >
      {!isEditing ? (
        <>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              marginBottom: 1,
              wordWrap: "break-word",
            }}
          >
            {newTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Completed:
            <Checkbox
              checked={isCompleted}
              onChange={handleCheckboxToggle}
              color="primary"
            />
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              sx={{ padding: 1 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{ padding: 1 }}
            >
              Delete
            </Button>
          </Box>
        </>
      ) : (
        <Box>
          <TextField
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            variant="outlined"
            label="Edit Task Title"
            multiline
            minRows={2}
            sx={{
              marginBottom: 2,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleUpdate}
              sx={{ padding: 1 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(false)}
              sx={{ padding: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Task;
