// Helpers
var assign = require('object-assign');
var Todo = require('../models');

/**
 * Get All Todos
 */
var index = function (req, res) {
  Todo.find(function(err, todos) {
    if (err) return res.send(err);
    res.json(todos);
  });
}

/**
 * Show Single Todo
 */
var show = function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return res.status(404).send(err);
    res.json({ todo });
  });
}

/**
 * Create New Todo
 */
var create = function (req, res) {
  var todo = new Todo();
  todo = assign(todo, req.body.todo);
  todo.save(function (err) {
    if (err) return res.status(400).send(err);
    res.json({ todo })
  })
}

/**
 * Update Todo
 */
var update = function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) {
      res.status(404).send(err);
    } else {
      todo = assign(todo, req.body.todo);
      todo.updatedAt = new Date();
      todo.save(function (err) {
        if (err) return res.send(err);
        res.json({ todo });
      });
    }
  });
}

/**
 * Delete Todo
 */
var destroy = function (req, res) {
  Todo.remove({ _id: req.params.id }, function (err, todo) {
    if (err) return res.status(404).send(err);
    res.status(200).send();
  });
}

// Routes
var routes = {
  index,
  show,
  create,
  update,
  destroy,
};

module.exports = routes;
