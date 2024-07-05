import { Schema, model } from "mongoose";

const todoSchema = new Schema(
    {
        todoTitle: {
            type: String,
            required: true,
        },
        todoContent: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }, {timestamps: true}
)

const Todo = model("Todo", todoSchema)

export default Todo