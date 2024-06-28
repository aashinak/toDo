import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // validation check TODO:(regEx have to be added)
    if (
        [username, email, password].some(
            (fields) =>
                fields === null || fields === undefined || fields.trim() === ""
        )
    ) {
        return res.sendError(400,"All fields required")
    }
    // check user already exists
    const existingUser = await User.findOne({$or: [{username},{email}]})
    if(existingUser) return res.sendError(400,"User already exists")
    // create new user
    const user = await User.create({username: username.toLowerCase(),email,password})
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser) throw new Error("Something went wrong while creating new user")
    // return created user
    return res.sendSuccess(201,createdUser,"User created successfully")
});

export { registerUser };
