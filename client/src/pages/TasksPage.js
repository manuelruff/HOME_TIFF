import React from "react";
import { useLocation } from "react-router-dom";
import {Typography, Paper } from "@mui/material";
import TaskList from "../components/TaskList";

const TasksPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const username = query.get("username");

  return (
      <Paper
        sx={{
          width: "70%",
          padding: 3,
        }}
      >
        <Typography variant="h4">
          Tasks for {username}:
        </Typography>
        <TaskList username={username} />
      </Paper>
  );
};

export default TasksPage;
