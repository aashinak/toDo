import "dotenv/config";
import { app } from "../src/app.js";
import connectDb from "./db/index.js";

const port = process.env.PORT || 4000;

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });
});
