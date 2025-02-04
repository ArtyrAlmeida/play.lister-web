import { Request, Response } from 'express';
import RequestError from '../exceptions/RequestError';
import UserService from '../services/UserService';
import { log } from 'console';

export class UserController {
    private service = new UserService();
    
    register = async (req: Request, res: Response) => {
        const user = req.body;
        try {
            const response = await this.service.register(user);
            res.status(201).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };

    login = async (req: Request, res: Response) => {
        const user = req.body;
        try {
            const response = await this.service.login(user);
            res.status(200).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };

    find = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const response = await this.service.find(id);
            res.status(201).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };
}