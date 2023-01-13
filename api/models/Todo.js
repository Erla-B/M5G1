const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The schema for the to-do list
const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now() // To get current time
    }
})

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;