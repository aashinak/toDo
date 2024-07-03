import Todo from "../models/todo.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const addTodo = asyncHandler(async (req, res) => {
    const { todoTitle, todoContent, category } = req.body;
    if (!todoTitle || !todoContent || !category)
        return res.sendError(400, "All fields required");
    const existingTodo = await Todo.findOne({
        createdBy: req.user._id,
        todoTitle,
        category,
    });
    if (existingTodo) return res.sendError(400, "same todo already exists");
    const todo = await Todo.create({
        todoTitle,
        todoContent,
        category,
        createdBy: req.user?._id,
    });

    const createdTodo = await Todo.findById(todo._id);
    if (!createdTodo) {
        throw new Error("Something went wrong while creating todo");
    }
    return res.sendSuccess(200, createdTodo, "Todo created successfully");
});

const deleteTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.body;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) return res.sendError(400, "Invalid todoId");
    return res.sendSuccess(200, {}, "Todo deleted successfully");
});

const updateTodo = asyncHandler(async (req, res) => {
    const { todoId, todoTitle, todoContent, isActive } = req.body;
    if (!todoId || !todoTitle || !todoContent)
        return res.sendError(400, "All fields required");
    if (typeof isActive !== "boolean")
        return res.sendError(400, "isActive field should be of Boolean Type");
    const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        { todoTitle, todoContent, isActive },
        { new: true }
    );
    if (!updatedTodo) return res.sendError(400, "invalid todoId");
    return res.sendSuccess(200, updatedTodo, "Todo updated successfully");
});

export { addTodo, deleteTodo, updateTodo };
