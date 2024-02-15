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
        profilePicture: {
            type: String,
            required: false,
            default: "photo.jpg"
        },
        coverPicture: {
            type: String,
            required: false,
            default: "cover.jpg"
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