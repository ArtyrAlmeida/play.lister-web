import { PlaylistInterface } from '../interfaces';
import PlaylistValidator from '../validators/PlaylistValidator';
import RequestError from '../exceptions/RequestError';
import PlaylistRepository from '../repository/PlaylistRepository';
import SongRepository from '../repository/SongRepository';
import { log } from 'console';
import UserRepository from '../repository/UserRepository';

export default class playlistservice {
    private repository = new PlaylistRepository();

    create = async (playlist: PlaylistInterface) => {
        if (!PlaylistValidator.hasAllProperties(playlist)) {
            throw new RequestError('A playlist não possui todas as informações necessárias', 400);
        }
        if(await PlaylistValidator.playlistAlreadyExists(playlist)) {
            throw new RequestError('Essa playlist já existe', 422);
        }

        const user = await (new UserRepository).findById(playlist.author);
        playlist.authorName = user!.name;

        const response = await this.repository.create(playlist);

        return response;
    };

    find = async () => {
        const response = await this.repository.find();

        log(response)

        const formattedDates = response.map(playlist => {
            const date = new Date(playlist.createdAt!);
            const day =  date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            return { ...playlist.toObject(), createdAt: formattedDate };
        })

        return formattedDates;
    };

    findOne = async (id: string) => {
        if (!PlaylistValidator.isValidId(id)) {
            throw new RequestError('O id provido é inválido', 400);
        }
        const response = await this.repository.findOne(id);

        return response;
    };

    findSongs = async (id: string) => {
        if (!PlaylistValidator.isValidId(id)) {
            throw new RequestError('O id provido é inválido', 400);
        }
        const response = await this.repository.findSongs(id);

        return response;
    };

    findByUser = async (id: string) => {
        if (!PlaylistValidator.isValidId(id)) {
            throw new RequestError('O id provido é inválido', 400);
        }
        const response = await this.repository.findByUser(id);

        const formattedDates = response.map(playlist => {
            const date = new Date(playlist.createdAt!);
            const day =  date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            return { ...playlist.toObject(), createdAt: formattedDate };
        })

        return formattedDates;
    };

    updateOne = async (id: string, payload: object) => {
        if (!PlaylistValidator.isValidId(id)) {
            throw new RequestError('O id provido é inválido', 400);
        }

        const response = await this.repository.updateOne(id, { $set: payload });

        return response;
    }

    deleteOne = async (id:string) => {
        if (!PlaylistValidator.isValidId(id)) {
            throw new RequestError('O id provido é inválido', 400);
        }

        const response = await this.repository.deleteOne(id);

        return response;
    }
}