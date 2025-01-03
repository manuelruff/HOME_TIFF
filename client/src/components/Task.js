import React from "react";

const Task = ({ task }) => {
  return (
    <li>
      <span>{task.title}</span> - <span>{task.completed ? "Completed" : "Incomplete"}</span>
    </li>
  );
};

export default Task;
