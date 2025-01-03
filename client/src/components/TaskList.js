import React, { useState, useEffect } from "react";
import { fetchTasks, addTask } from "../services/fetchers";
import Task from "./Task";

const TaskList = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      const { success, data } = await fetchTasks(username);
      if (success) {
        setTasks(data);
      }
    };

    if (username) getTasks();
  }, [username]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const { success, data } = await addTask(newTask, username);
    if (success) {
      setTasks([...tasks, data]);
      setNewTask("");
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
