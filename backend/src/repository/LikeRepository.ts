import { LikeInterface } from "../interfaces";
import Like from "../models/Like";

export default class LikeRepository {
    async create(like: LikeInterface) {
        const newLike = await Like.create(like)
        return newLike;
    }

    async findLikesByUser(userId: string) {
        const likes = await Like.find({ userId });

        return likes;
    }
}