import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import { responseHandler } from "./middlewares/responseHandler.js";
import cookieParser from "cookie-parser";
import { serverErrorHandler } from "./middlewares/serverErrorHandler.js";
import todoRoute from "./routes/todo.routes.js";

const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handler for api responses
app.use(responseHandler);
app.use(cookieParser());

app.use("/users", userRoute);
app.use("/todo", todoRoute);

// handler for server side errors
app.use(serverErrorHandler);
export { app };
