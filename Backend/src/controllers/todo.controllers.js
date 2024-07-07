import Category from "../models/category.model.js";
import Todo from "../models/todo.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.body;
    if (!categoryName) return res.sendError(400, "Category name required");
    const existingCategory = await Category.findOne({
        createdBy: req.user._id,
        categoryName,
    });
    if (existingCategory)
        return res.sendError(400, "Same category already exists");

    const category = await Category.create({
        categoryName,
        createdBy: req.user?._id,
    });

    return res.sendSuccess(200, category, "Category created successfully");
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.body;
    const category = await Category.findOneAndDelete({ _id: categoryId });
    if(!category) return res.sendError(400, "Invalid category id")
    
    await Todo.deleteMany({ _id: { $in: category.todos.map(todo => todo._id) } })
    
    return res.sendSuccess(200, "Category deleted successfully")
});

const addTodo = asyncHandler(async (req, res) => {
    const { todoTitle, todoContent, categoryId } = req.body;
    if (!todoTitle || !todoContent || !categoryId)
        return res.sendError(400, "All fields required");

    // const existingTodo = await Todo.findOne({
    //     createdBy: req.user._id,
    //     todoTitle
    // });
    const category = await Category.findOne({
        _id: categoryId,
        createdBy: req.user?._id,
    });

    if (!category) return res.sendError(400, "Invalid categoryId");

    const todo = await Todo.create({
        todoTitle,
        todoContent,
        createdBy: req.user?._id,
    });

    const createdTodo = await Todo.findById(todo._id);
    if (!createdTodo) {
        throw new Error("Something went wrong while creating todo");
    }

    category.todos.push(createdTodo._id);
    await category.save();

    return res.sendSuccess(200, createdTodo, "Todo created successfully");
});

const deleteTodo = asyncHandler(async (req, res) => {
    const { todoId, categoryId } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            $pull: { todos: { _id: todoId } },
        },
        { new: true }
    );
    if (!updatedCategory) return res.sendError(400, "Invalid categoryId");
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

const getAllTodo = asyncHandler(async(req,res) => {
    const allTodos = await Category.aggregate(
        [
            {
              $match: {
                createdBy: req.user?._id
              }
            },
            {
              $lookup: {
                from: "todos",
                localField: "todos._id",
                foreignField: "_id",
                as: "todosDetails"
              }
            },
            {
              $project: {
                _id: 1,
                categoryName: 1,
                createdBy: 1,
                createdAt: 1,
                updatedAt: 1,
                todosDetails: 1
              }
            }
          ]
    )
    if(!allTodos) return res.sendError(400, "Something went wrong")
    return res.sendSuccess(200, allTodos, "All todos with categories fetched")
})



export { addTodo, deleteTodo, updateTodo, createCategory, deleteCategory,getAllTodo };
