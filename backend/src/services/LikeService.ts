import RequestError from "../exceptions/RequestError";
import { LikeInterface } from "../interfaces";
import LikeRepository from "../repository/LikeRepository";

export default class LikeService {
    private repository = new LikeRepository();

    public async create(like: LikeInterface) {
        if (!like.playlistId || !like.userId) {
            throw new RequestError('O like não possui todas as informações necessárias', 400);
        }

        const newLike = await this.repository.create(like);
        return newLike;
    }

    public async findLikesByUser(userId: string) {
        const likes = await this.repository.findLikesByUser(userId);
        return likes;
    }
}