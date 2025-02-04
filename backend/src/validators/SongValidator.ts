import mongoose from 'mongoose';
import { SongInterface } from '../interfaces';
import SongRepository from '../repository/SongRepository';

export default class SongValidator {
    static hasAllProperties(song: SongInterface) {
        console.log(song);
        return true;
    }

    static async songAlreadyExists(song: SongInterface) {
        const repository = new SongRepository();
        console.log(repository);
        const hasSong = await repository.findOne(song._id!) ? true : false;
        return !song;
    }

    static isValidId(id: string) {
        return mongoose.Types.ObjectId.isValid(id);
    }
}