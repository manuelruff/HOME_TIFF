import React, { useState, useEffect } from "react";
import { fetchTasks, addTask } from "../services/fetchers";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { Box, Typography, List, Pagination,Alert, Button,CircularProgress } from "@mui/material";

const TaskList = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const tasksPerPage = 5;

  useEffect(() => {
    const getTasks = async () => {
      const { success, data } = await fetchTasks(username);
      if (success) {
        setTasks(data);
      }
      else {
        setError("Failed to fetch tasks, please try again");
      }
      setLoading(false);
    };
    setLoading(true);
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
      
      // calculates if i need to go back a page after deletion
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

  // update the task status in the parent component so we know if we need to hide it or not
  const handleTaskCompletionToggle = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: newStatus } : task
      )
    );
  };

  const toggleHideCompleted = () => {
    setHideCompleted((prev) => !prev); 
    // if hide/unhide we go back to the first page
    setCurrentPage(1);
  };

  // save list that we wanna show, based on the hideCompleted state
  const visibleTasks = hideCompleted ? tasks.filter((task) => !task.completed) : tasks;

  // calculate the total pages based on the visible tasks
  const totalPages = Math.ceil(visibleTasks.length / tasksPerPage);

  // calculat index of the first and last task to show on the current page
  const paginatedTasks = visibleTasks.slice(
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
        gap: 2,
        width: "100%",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
      {error && <Alert severity="error">{error}</Alert>}
      <TaskForm onAddTask={handleAddTask} />
      <Button
        variant="outlined"
        onClick={toggleHideCompleted}
        sx={{width: "100%",}}
      >
        {hideCompleted ? "Show Completed" : "Hide Completed"}
      </Button>
      <List sx={{ width: "100%" }}>
        {paginatedTasks.length > 0 ? (
          paginatedTasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onTaskDelete={handleTaskDelete}
              onTaskCompletet={handleTaskCompletionToggle}
            />
          ))
        ) : (
          <Typography variant="body1">{error ? "" : "No tasks available. Add a new task!"}</Typography>
        )}
      </List>
      {visibleTasks.length > tasksPerPage && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      )}
      </>
      )}
    </Box>
  );
};

export default TaskList;
