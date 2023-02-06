const express = require('express'); // Handles the api
const mongoose = require('mongoose'); // Handles the database
const cors = require('cors'); // 

const app = express();

app.use(express.json()); 
app.use(cors()); 

mongoose.set('strictQuery', true);

// Connecting to the database
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo'); // Importing the to-do schema

// Routes
// This is for getting your to-do's from the database 
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

// Making a new to-do
app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save(); // Saving the to-do to your collection

    res.json(todo); // Passes the to-do back to you
});

// For deleting from your to-do list. Uses a url parameter to find and delete a specific item
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result); // Passing back the result
});

// Toggles an item as 'complete'
app.get('/todo/complete/:id', async (req, res) => {
    console.log(req.params.id);
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete; // If it's complete then clicking makes it incomplete and vice versa

    todo.save(); // Saves it to the database

    res.json(todo); // Passes the updated to-do list to the app
});

app.listen(3001, () => console.log("Server started on port 3001"));
