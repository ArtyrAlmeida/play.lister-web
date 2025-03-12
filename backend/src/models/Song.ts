import mongoose from "mongoose";
import { SongInterface } from "../interfaces";

const Schema = mongoose.Schema;

const songSchema = new Schema<SongInterface>({
    name: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    genre : {
        type: String,
        required: true
    }
});

const Song = mongoose.model("songs", songSchema);

export default Song;