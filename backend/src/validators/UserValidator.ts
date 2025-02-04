import mongoose from 'mongoose';
import UserRepository from '../repository/UserRepository';
import { UserInterface } from '../interfaces';

export default class UserValidator {
    static isValidId(id: string) {
        return mongoose.Types.ObjectId.isValid(id);
    }
}