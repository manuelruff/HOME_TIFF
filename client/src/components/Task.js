import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/fetchers";
import { Typography, Checkbox, Button, TextField, Box } from "@mui/material";

const Task = ({ task, onTaskDelete,onTaskCompletet }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [previousTitle, setPreviousTitle] = useState(task.title); 

  const handleCheckboxToggle = async () => {
    const updatedStatus = !isCompleted;
    const { success } = await updateTask(task._id, {
      completed: updatedStatus,
    });
    if (success) {
      setIsCompleted(updatedStatus);
      // update state in parent component so he will hide or unhide the task
      onTaskCompletet(task._id, updatedStatus);
    }
    else {
      alert("Failed to update task, please try again");
    }
  };

  const handleDelete = async () => {
    const { success } = await deleteTask(task._id);
    if (success) {
      // update state in parent component so he will remove from its list
      onTaskDelete(task._id);
    }
    else {
      alert("Failed to delete task, please try again");
    }
  };

  const handleEdit = () => {
    // we save the previous title in case the user cancels the edit or we have a pronlem updating the task title
    setPreviousTitle(newTitle); 
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const { success } = await updateTask(task._id, { title: newTitle });
    if (success) {
      setIsEditing(false); 
    } else {
      setNewTitle(previousTitle);
      setIsEditing(false); 
      alert("Failed to update task, please try again");
    }
  };

  const handleCancel = () => {
    setNewTitle(previousTitle);
    setIsEditing(false); 
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
          <Typography variant="h6" sx={{ wordWrap: "break-word" }}>
            {newTitle}
          </Typography>
          <Typography variant="body2">
            Completed:
            <Checkbox
              checked={isCompleted}
              onChange={handleCheckboxToggle}
              color="primary"
            />
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
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
            <Button variant="contained" color="success" onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Task;
