import React from "react";
import { useLocation } from "react-router-dom";
import TaskList from "../components/TaskList";

const TasksPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const username = query.get("username"); 

  return (
    <div>
      <h1>Tasks for {username}</h1>
      <TaskList username={username} />
    </div>
  );
};

export default TasksPage;
