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
        return res.sendError(400, "All fields required");
    }
    // check user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.sendError(400, "User already exists");
    // create new user
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
    });
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser)
        throw new Error("Something went wrong while creating new user");
    // return created user
    return res.sendSuccess(201, createdUser, "User created successfully");
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if (!email && !username) {
        return res.sendError(400, "Username or email required");
    }
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) return res.sendError(400, "Invalid email or username");
    const isPassword = await user.isPasswordCorrect(password);
    if (!isPassword) return res.sendError(400, "Incorrect password");
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        domain: process.env.FRONTEND_DOMAIN
    };
    return res
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .sendSuccess(200, loggedInUser, "User loggedIn successfully");
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user?._id, {
        $unset: {
            refreshToken: -1,
        },
    });
    const options = {
        httpOnly: true,
        secure: true,
    };
    res.clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .sendSuccess(200, {}, "User logged out");
});

const currentUser = asyncHandler(async (req, res) => {
    return res.sendSuccess(200, req.user, "fetched current user");
});

export { registerUser, loginUser, logoutUser, currentUser };
