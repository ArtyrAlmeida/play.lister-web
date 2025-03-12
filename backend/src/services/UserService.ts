import { UserInterface, LoginInfo, LikeInterface } from '../interfaces';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import RequestError from '../exceptions/RequestError';
import UserRepository from '../repository/UserRepository';
import { log } from 'console';
import LikeRepository from '../repository/LikeRepository';
import PlaylistRepository from '../repository/PlaylistRepository';
import SongRepository from '../repository/SongRepository';

export default class UserService {
    private repository = new UserRepository();

    register = async (user: UserInterface) => {
        const { name, email, password, image } = user;
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        const response = await this.repository.create({ ...user, password: hash });

        const id = response._id!;

        const token = await this.signToken(id);

        return { name, email, token, id, image };
    };

    login = async (user: LoginInfo) => {
        const dbUser = await this.repository.findByEmail(user.email);

        if(!dbUser) {
            throw new RequestError('O usuário não existe', 400)
        }

        const match = await bcrypt.compare(user.password, dbUser.password);

        if(match) {
            const { name, email, _id } = dbUser;
            const token = await this.signToken(dbUser._id!);
            return { name, email, token, id: _id.toString(), image: dbUser.image};
        }
        
        throw new RequestError('Credenciais erradas', 401);
    }

    find = async (id: string) => {
        const response = await this.repository.findById(id);

        return response;
    };

    signToken = async (id: string) => {
        return jwt.sign({id}, process.env.SECRET as string, {expiresIn: '3d'})
    }

    update = async (id: string, data: UserInterface) => {
        return await this.repository.updateFields(id, data);
    }
  
    analytics = async (id: string) => {
        const playlistRepository = new PlaylistRepository();
        const songRepository = new SongRepository();
        const userRepository = new UserRepository();

        const mostListened = await this.calcMostListened(id, playlistRepository, songRepository);
        const mostLiked = await this.calcMostLiked(id, playlistRepository, userRepository);
        const playlistsCreated = await this.calcPlaylistsCreated(id, playlistRepository);

        return {
            mostListened,
            mostLiked,
            playlistsCreated
        }
        
    }

    private calcMostListened = async (id: string, playlistRepository: PlaylistRepository, songRepository: SongRepository) => {
        const userPlaylists = await playlistRepository.findByUser(id);
        const songsIds = userPlaylists.map(playlist => playlist.songs).flat();
        
        const songs = await songRepository.findByArray(songsIds);

        const occurrences = songsIds.reduce(function (acc, curr) {
            const key = songs.find(song => song.id == curr)!.author;
            return acc[key] ? ++acc[key] : acc[key] = 1, acc
        }, {} as { [key: string]: number });

        const sorted = this.getTop(occurrences);

        const entries = sorted.map(result => result[0]);
        const values = sorted.map(result => result[1]);

        return { labels: entries, values: values };

    }

    private calcMostLiked = async (id: string, playlistRepository: PlaylistRepository, userRepository: UserRepository) => {
        const playlists = await playlistRepository.findPlaylistsLikedByUser(id);
        const userIds = playlists.map(playlist => playlist.author);

        const users = await userRepository.findByArray(userIds);

        const occurrences = userIds.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {} as { [key: string]: number });

        const sorted = this.getTop(occurrences);

        const entries = sorted.map(result => {
            const id = result[0];
            return users.find(user => user._id == id)!.name;
        });

        const values = sorted.map(result => result[1]);

        return { labels: entries, values: values };
    }

    private calcPlaylistsCreated = async (id: string, playlistRepository: PlaylistRepository) => {
        const months = this.getThreeMonths();
        const results = await Promise.all(months.map(async (month) => {
            return [month, (await playlistRepository.findPlaylistsByMonth(id, month)).length]
        }));

        const entries = results.map(result => result[0]);
        const values = results.map(result => result[1]);

        return { labels: entries, values: values };
    }

    getTop(obj: { [key: string]: number }) {
        return Object.entries(obj)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6); 
    }

    getThreeMonths() {
        const currentDate = new Date();
        const months = [];
        
        for (let i = 0; i < 3; i++) {
            let date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            months.push(date.toISOString().slice(0, 7));
        }
        
        return months;
    }
}