# **To-Do List Site - Tiff Home Assignment**

This project is a **full-stack to-do list application** built using **React** for the frontend and **Node.js/Express** for the backend, with a **MongoDB Atlas** database and deployment to **AWS Lambda + API Gateway** and **S3** for hosting.

---

## **Project Overview**

A simple and functional to-do list web application where users can:
- Register and log in with their accounts.
- Create, update, delete, and list tasks.
- Mark tasks as completed or pending.
- Toggle to hide completed tasks.

---

## **Installation**

**Clone the repositry:**
   ```bash
   git clone "https://github.com/manuelruff/HOME_TIFF.git"
   ```

## **Frontend Setup**

1. **Navigate to the frontend directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` in the `client` directory:**
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend locally:**
   ```bash
   npm start
   ```

---

## **Backend Setup**

1. **Navigate to the backend directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` in the `server` directory:**
   ```bash
   MONGO_URI=mongodb+srv://manuelr:Manuel1969@todolist.ikcih.mongodb.net/todo?retryWrites=true&w=majority&appName=ToDoList
   PORT=5000
   ```
    #### you can change the MONGO_URI to your db

4. **Run the backend locally:**
   ```bash
   node index.js
   ```
   Your server will be running at `http://localhost:5000`.

---

## **API Endpoints**

### **User Routes (`/api/users/`)**
- **POST /users**: Register a new user.
- **POST /users/login**: Log in a user.
- i left some as a note for debugging if needed
  
### **Task Routes (`/api/tasks/`)**
- **POST /tasks**: Add a new task.
- **GET /tasks?username=<username>**: Get tasks for the user.
- **PUT /tasks/:id**: Update a task.
- **DELETE /tasks/:id**: Delete a task.

---

## **Usage**

### **Postman Requests:**

1. **Registration Request**:
   - URL: `http://localhost:5000/api/users`
   - Method: `POST`
   - Body (JSON):
     ```json
     {
       "name": "example_user",
       "password": "example_password"
     }
     ```

2. **Login Request**:
   - URL: `http://localhost:5000/api/users/login`
   - Method: `POST`
   - Body (JSON):
     ```json
     {
       "name": "example_user",
       "password": "example_password"
     }
     ```

3. **Get All Tasks for a User:**
   - URL: `http://localhost:5000/api/tasks?username=example_user`
   - Method: `GET`

4. **Add a Task:**
   - URL: `http://localhost:5000/api/tasks`
   - Method: `POST`
   - Body (JSON):
     ```json
     {
       "title": "New Task",
       "username": "example_user"
     }
     ```

5. **Update a Task:**
   - **URL**: `http://localhost:5000/api/tasks/{taskId}`
   - **Method**: `PUT`
   - **Body (JSON)**:
     ```json
     {
       "title": "Updated Task Title",
       "completed": true
     }
     ```

6. **Delete a Task:**
   - **URL**: `http://localhost:5000/api/tasks/{taskId}`
   - **Method**: `DELETE`


---

## **Future Improvements**
- Add JWT-based authentication for better security.
---
