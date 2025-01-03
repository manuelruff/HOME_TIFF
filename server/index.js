const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

// Middleware
// local start
app.use(cors());
// local end

// not local start
// app.use(
//   cors({
//     origin: "http://manu-todo-client.s3-website.eu-central-1.amazonaws.com",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
// not local end

app.use(express.json());


// not local start
// // MongoDB connection tracking
// let isConnected;

// async function connectToDatabase() {
//   if (isConnected) {
//     console.log("Using existing database connection");
//     return;
//   }
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     isConnected = true;
//     console.log("Connected to MongoDB Atlas");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// }
// // Middleware to ensure database connection for each request
// app.use(async (req, res, next) => {
//   await connectToDatabase();
//   next();
// });
// no local end


// Routes
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});



// local start
// MongoDB Connection
mongoose
.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// local end


// not local start
// // Export as a Lambda handler instead of starting the server
// module.exports.handler = serverless(app);
// not local end