import { Router } from "express";
import {
    addTodo,
    createCategory,
    deleteCategory,
    deleteTodo,
    updateTodo,
} from "../controllers/todo.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);

router.route("/addTodo").post(addTodo);
router.route("/deleteTodo").post(deleteTodo);
router.route("/updateTodo").post(updateTodo);
router.route("/createCategory").post(createCategory);
router.route("/deleteCategory").post(deleteCategory);

export default router;