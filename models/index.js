const mongoose = require('mongoose');

mongoose.set('debug', true); //this enable us to see what is happening at any time, without silently failing
mongoose.connect('mongodb://localhost/todos-api', {useNewUrlParser: true});

mongoose.Promise = Promise; //this allows us to use Promise syntax

module.exports.ToDo = require("./todo");