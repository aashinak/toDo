import express from "express";
import userRoute from "./routes/user.routes.js";
import { responseHandler } from "./middlewares/responseHandler.js";
import { serverErrorHandler } from "./middlewares/serverErrorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handler for api responses
app.use(responseHandler)

app.use("/users", userRoute)

// handler for server side errors
app.use(serverErrorHandler)
export { app };
