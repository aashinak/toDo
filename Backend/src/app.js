import express from "express";
import cors from 'cors'
import userRoute from "./routes/user.routes.js";
import { responseHandler } from "./middlewares/responseHandler.js";
import cookieParser from 'cookie-parser'
import { serverErrorHandler } from "./middlewares/serverErrorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}))
// handler for api responses
app.use(responseHandler)
app.use(cookieParser())

app.use("/users", userRoute)

// handler for server side errors
app.use(serverErrorHandler)
export { app };
