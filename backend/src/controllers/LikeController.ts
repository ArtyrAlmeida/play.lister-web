import RequestError from "../exceptions/RequestError";
import { LikeInterface } from "../interfaces";
import LikeService from "../services/LikeService";
import { Request, Response } from 'express';

export class LikeController {
    private service = new LikeService();

    create = async (req: Request, res: Response) => {
        const like = req.body;
        try {
            const response = await this.service.create(like as LikeInterface);
            res.status(201).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };

    findByUser = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const response = await this.service.findLikesByUser(id);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: 'Não foi possível completar sua requisição' });
            console.log(error);
        }
    };
}