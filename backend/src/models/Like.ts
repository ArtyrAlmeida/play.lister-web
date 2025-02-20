import mongoose from "mongoose";
import { LikeInterface  } from "../interfaces";

const Schema = mongoose.Schema;

const likeSchema = new Schema<LikeInterface>({
    playlistId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Like = mongoose.model("likes", likeSchema);

export default Like;