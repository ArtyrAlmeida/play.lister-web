import { SongInterface } from '../interfaces';
import SongValidator from '../validators/SongValidator';
import RequestError from '../exceptions/RequestError';
import SongRepository from '../repository/SongRepository';

export default class songservice {
    private repository = new SongRepository();

    create = async (song: SongInterface) => {
        if (!SongValidator.hasAllProperties(song)) {
            throw new RequestError('A música não possui todas as informações necessárias', 400);
        }
        if(await SongValidator.songAlreadyExists(song)) {
            throw new RequestError('Essa música já existe', 422);
        }

        const response = await this.repository.create(song);

        return response;
    };

    find = async () => {
        const response = await this.repository.find();

        return response;
    };

    findOne = async (id: string) => {
        if (!SongValidator.isValidId(id)) {
            throw new RequestError('O id provido é inválido', 400);
        }
        const response = await this.repository.findOne(id);

        return response;
    };

    updateOne = async (id: string, payload: object) => {
        if (!SongValidator.isValidId(id)) {
            throw new RequestError('O id provido é inválido', 400);
        }

        const response = await this.repository.updateOne(id, payload);

        return response;
    }

    deleteOne = async (id:string) => {
        if (!SongValidator.isValidId(id)) {
            throw new RequestError('O id provido é inválido', 400);
        }

        const response = await this.repository.deleteOne(id);

        return response;
    }
}