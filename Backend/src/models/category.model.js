import mongoose, { Schema } from "mongoose";

import Todo from "./todo.models.js";


const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        todos: [
            {
                todoId: {
                    type: Schema.Types.ObjectId,
                    ref: "Todo",
                },
            },
        ],
    },
    { timestamps: true }
);


// categorySchema.pre("findOneAndDelete",{ document: true, query: false }, async function(next){
//     try {
//         console.log("hey");
//         await mongoose.model("Todo").deleteMany({ _id: { $in: this.todos.map(todo => todo._id) } });
//         next()
//     } catch (error) {
//         next(error)
//     }
// })

const Category = mongoose.model("Category", categorySchema);


export default Category;

