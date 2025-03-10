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

    analytics = async (id: string) => {
        const likeRepository = new LikeRepository();
        const playlistRepository = new PlaylistRepository();
        const songRepository = new SongRepository();

        const userLikes = await likeRepository.findLikesByUser(id);
        const userPlaylists = await playlistRepository.findByUser(id);
        
    }

    private calcMostListened = async (id: string, playlistRepository: PlaylistRepository, songRepository: SongRepository) => {
        const userPlaylists = await playlistRepository.findByUser(id);
        const songsIds = userPlaylists.map(playlist => playlist.songs).flat();
        const songs = await songRepository.findByArray(songsIds);
    }

    private calcMostLiked = async (likes: LikeInterface) => {

    }
}