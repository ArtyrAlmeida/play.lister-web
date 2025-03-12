import mongoose from "mongoose";
import { UserInterface } from "../interfaces";

const Schema = mongoose.Schema;

const userSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    playlists: {
        type: [String],
        required: false
    },
    image: {
        type: String,
        required: true,
    },
    favoriteGenres: {
        type: [String],
        required: false,
        default: []
    },
});

const User = mongoose.model("users", userSchema);

export default User;