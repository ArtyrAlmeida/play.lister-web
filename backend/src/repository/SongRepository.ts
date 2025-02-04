import { SongInterface } from '../interfaces';
import Song from '../models/Song';

export default class SongRepository {
    async create(song: SongInterface) {
        const createdSong = await Song.create({...song});
        
        return createdSong;
    }

    async find() {
        const result = await Song.find();

        return result;
    }

    async findOne(id: string) {
        const result = await Song.findOne({ _id: id });
        
        return result;
    }

    async updateOne(id: string, payload: object) {
        const result = await Song.updateOne({ _id: id }, { $set: payload });

        return result;
    }

    async deleteOne(id: string) {
        const result = await Song.deleteOne({ _id: id });

        return result;
    }
}