
import {Router} from 'express'
import { addTodo, deleteTodo, updateTodo } from '../controllers/todo.controllers.js'
import { verifyJwt } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyJwt)

router.route("/addTodo").post(addTodo)
router.route("/deleteTodo").post(deleteTodo)
router.route("/updateTodo").post(updateTodo)

export default router