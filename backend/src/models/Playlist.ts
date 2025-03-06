import mongoose from "mongoose";
import { PlaylistInterface } from "../interfaces";
import Song from "./Song";

const Schema = mongoose.Schema;

const plalistSchema = new Schema<PlaylistInterface>({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    songs: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Plalist = mongoose.model("playlists", plalistSchema);

export default Plalist;