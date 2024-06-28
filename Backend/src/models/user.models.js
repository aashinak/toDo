import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password required"],
    },
    refreshToken: {
        type: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const password = this.password;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    this.password = hashedPassword;
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
