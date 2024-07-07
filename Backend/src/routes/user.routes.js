import { Router } from "express";
import {
    currentUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/getCurrentUser").get(verifyJwt, currentUser);

export default router;
