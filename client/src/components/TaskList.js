import React, { useState, useEffect } from "react";
import { fetchTasks, addTask } from "../services/fetchers";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { Box, Typography, List, Pagination } from "@mui/material";

const TaskList = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const tasksPerPage = 5;

  useEffect(() => {
    const getTasks = async () => {
      const { success, data } = await fetchTasks(username);
      if (success) {
        setTasks(data);
      }
    };

    if (username) getTasks();
  }, [username]);

  const handleAddTask = async (taskTitle) => {
    const { success, data } = await addTask(taskTitle, username);
    if (success) {
      setTasks((prevTasks) => [...prevTasks, data]);
    }
    return success;
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task._id !== taskId);
      
      const remainingTasksOnPage = updatedTasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
      ).length;
  
      if (remainingTasksOnPage === 0 && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
  
      return updatedTasks;
    });
  };
  
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        width: "100%",
      }}
    >
      <TaskForm onAddTask={handleAddTask} />
      <List sx={{ width: "100%" }}>
        {paginatedTasks.length > 0 ? (
          paginatedTasks.map((task) => (
            <Task key={task._id} task={task} onTaskDelete={handleTaskDelete} />
          ))
        ) : (
          <Typography variant="body1">No tasks available. Add a new task!</Typography>
        )}
      </List>
      {tasks.length > tasksPerPage && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      )}
    </Box>
  );
};

export default TaskList;
