const db = require("../models");

exports.getToDos = (req, res) => {
    db.ToDo.find()
        .then((todos) => res.json(todos))
        .catch((err) => res.send(`Oops, something went wrong -> ${err}`))
}

exports.createToDo = (req, res) => {
  db.ToDo.create(req.body)
        .then((newTodo) => res.status(201).json(newTodo))
        .catch((err) => res.send(`Oops, something went wrong -> ${err}`))
}

exports.getToDo = (req, res) => {
   db.ToDo.findById(req.params.todoId)
        .then((foundToDo) => res.json(foundToDo))
        .catch((err) => res.send(`Oops, something went wrong -> ${err}`))
}

exports.updateToDo = (req, res) => {
    db.ToDo.findOneAndUpdate({ _id: req.params.todoId}, req.body, { new: true }) // new: true, makes mongodb returns the updated data instead of old data
        .then((updatedToDo) => res.json(updatedToDo))
        .catch((err) => res.send(`Oops, something went wrong -> ${err}`))
}

exports.deleteToDo = (req, res) => {
    db.ToDo.remove({ _id: req.params.todoId })
        .then(() => res.json("Deleted Successfully!"))
        .catch((err) => res.send(`Oops, something went wrong -> ${err}`))
}

module.exports = exports;