import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api", 
});

const fetchLogin = async (name, password) => {
  try {
    const response = await api.post("/users/login", { name, password });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || "Login failed" };
  }
};

const fetchTasks = async (username) => {
  try {
    const response = await api.get(`/tasks?username=${username}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || "Failed to fetch tasks" };
  }
};

const addTask = async (title, username) => {
  try {
    console.log(title,username);
    
    const response = await api.post("/tasks", { title, username });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || "Failed to add task" };
  }
};

const updateTask = async (taskId, updates) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updates);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || "Failed to update task" };
  }
};

const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || "Failed to delete task" };
  }
};

export {api,fetchLogin,fetchTasks,addTask,updateTask,deleteTask};

