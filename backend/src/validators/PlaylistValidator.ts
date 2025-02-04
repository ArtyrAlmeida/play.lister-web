import mongoose from 'mongoose';
import { PlaylistInterface } from '../interfaces';
import PlaylistRepository from '../repository/PlaylistRepository';

export default class PlaylistValidator {
    static hasAllProperties(playlist: PlaylistInterface) {
        console.log(playlist);
        return true;
    }

    static async playlistAlreadyExists(playlist: PlaylistInterface) {
        const repository = new PlaylistRepository();
        console.log(repository);
        const hasPlaylist = await repository.findOne(playlist._id!) ? true : false;
        return !playlist;
    }

    static isValidId(id: string) {
        return mongoose.Types.ObjectId.isValid(id);
    }
}