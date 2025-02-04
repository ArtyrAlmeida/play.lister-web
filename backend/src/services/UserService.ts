import { UserInterface, LoginInfo } from '../interfaces';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import RequestError from '../exceptions/RequestError';
import UserRepository from '../repository/UserRepository';
import { log } from 'console';

export default class UserService {
    private repository = new UserRepository();

    register = async (user: UserInterface) => {
        const { name, email, password } = user;
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        const response = await this.repository.create({ ...user, password: hash });

        const id = response._id!;

        const token = await this.signToken(id);

        return { name, email, token, id };
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
}