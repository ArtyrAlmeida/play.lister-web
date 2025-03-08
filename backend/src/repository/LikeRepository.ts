import { LikeInterface } from "../interfaces";
import Like from "../models/Like";

export default class LikeRepository {
    async create(like: LikeInterface) {
        const newLike = await Like.create(like)
        return newLike;
    }

    async findOne(userId: string, playlistId: string) {
        const like = await Like.findOne({ userId, playlistId });

        return like;
    }

    async deleteOne(userId: string, playlistId: string) {
        const like = await Like.deleteOne({ userId, playlistId });

        return like;
    }

    async findLikesByUser(userId: string) {
        const likes = await Like.find({ userId });

        return likes;
    }
}