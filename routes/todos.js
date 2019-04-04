const express = require('express'),
      router  = express.Router(),
      db = require("../models"),
      helpers = require("../helpers/todos");
      
router.route('/')
    .get(helpers.getToDos)
    .post(helpers.createToDo)

router.route('/:todoId')
    .get(helpers.getToDo)
    .put(helpers.updateToDo)
    .delete(helpers.deleteToDo)

module.exports = router;