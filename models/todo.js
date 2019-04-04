const mongoose = require("mongoose"),
      moment = require("moment");

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank!'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: moment().format('LLLL')
    }
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;