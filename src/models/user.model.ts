import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        cars: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car"
        }],
        rent: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rent"
        }],
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;