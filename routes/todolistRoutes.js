const express = require("express");
const Todo = require("../models/todoModel");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const todolist = await Todo.find({});
    res.json(todolist);
  })
);

router.get(
  "/archive",
  asyncHandler(async (req, res) => {
    const todolistCompleted = await Todo.find({ completed: true });

    if (todolistCompleted) {
      res.json(todolistCompleted);
    }

    res.status(404).json({ message: "No completed task yet" });
    // const filteredCompleted = todoList.filter((todo) => {
    //   return todo.completed === true;
    // });
    // res.json(filteredCompleted);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { todo, completed, priority, dateToComplete } = req.body;

      const newTodo = new Todo({
        todo,
        completed,
        priority,
        dateToComplete,
      });

      await newTodo.save();

      res.status(201).json({ message: "Todo created successfully", newTodo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  })
);

router.delete(
  "/:todoId",
  asyncHandler(async (req, res) => {
    try {
      const todoId = req.params.todoId;

      // Find and delete the expense associated with the logged-in user
      const deletedTodo = await Todo.findOneAndDelete({ _id: todoId });

      if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.json({ message: "Todo deleted successfully", deletedTodo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  })
);

module.exports = router;
