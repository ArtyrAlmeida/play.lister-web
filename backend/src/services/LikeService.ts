import RequestError from "../exceptions/RequestError";
import { LikeInterface } from "../interfaces";
import LikeRepository from "../repository/LikeRepository";
import PlaylistRepository from "../repository/PlaylistRepository";

export default class LikeService {
    private repository = new LikeRepository();

    public async create(like: LikeInterface) {
        if (!like.playlistId || !like.userId) {
            throw new RequestError('O like não possui todas as informações necessárias', 400);
        }

        const newLike = await this.repository.create(like);
        await (new PlaylistRepository).updateOne(like.playlistId, { $push: { usersLiked: like.userId } });
        return newLike;
    }

    public async findLikesByUser(userId: string) {
        const likes = await this.repository.findLikesByUser(userId);
        return likes;
    }

    public async deleteLike(userId: string, playlistId: string) {
        const playlistRepository = new PlaylistRepository();
        const deletion = await this.repository.deleteOne(userId, playlistId);

        const playlist = await playlistRepository.findOne(playlistId);
        const playlistLikes = playlist!.usersLiked.filter(user => user != userId);
        await playlistRepository.updateOne(playlistId, { $set: { usersLiked: playlistLikes } });

        return deletion;
    }
}