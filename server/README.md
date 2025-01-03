to run loccaly change the main.js to have:
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
instead of:
// Export as a Lambda handler instead of starting the server
module.exports.handler = serverless(app);

change the way you connect to the mongo from local and not local tags

you need to have .env like following:
example:
MONGO_URI=mongodb+srv://manuelr:<Password>@todolist.ikcih.mongodb.net/todo?retryWrites=true&w=majority&appName=ToDoList
PORT=5000


you need to have 

1. app.use(cors());

2. const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    