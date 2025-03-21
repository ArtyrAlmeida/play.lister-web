import { log } from "console";
import { UserInterface } from "../interfaces";
import User from "../models/User"


export default class UserRepository {
    async create(user: UserInterface) {
        log("Repository")
        try {
            
            const createdUser = await User.create({...user})
            return createdUser;
        } catch (error) {
            console.log(error);
            return { _id: '1' }
        }
        
    }

    async findByEmail(email: string) {
        const result = await User.findOne({ email });

        return result;
    }

    async findById(id: string) {
        const result = await User.findById(id, { email: 1, name: 1, image: 1, favoriteGenres: 1 });

        return result;
    }

    async updateOne(userId: string, query: object) {
        const result = await User.findByIdAndUpdate(userId, { $set: query });
        
        return result;
    }

    async updateFields(userId: string, fieldsToUpdate: Partial<UserInterface>) {
        const result = await User.findByIdAndUpdate(userId, { $set: fieldsToUpdate }, { new: true });
        
        return result;
    }
  
    async findByArray(ids: string[]) {
            const result = await User.find({ _id: { $in: ids } });
    
            return result;
        }
}