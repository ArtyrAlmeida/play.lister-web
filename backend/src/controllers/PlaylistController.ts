import PlaylistService from '../services/PlaylistService';
import RequestError from '../exceptions/RequestError';
import { Request, Response } from 'express';

export default class PlaylistController {
    private service = new PlaylistService();
    
    create = async (req: Request, res: Response) => {
        const playlist = req.body;
        try {
            const response = await this.service.create(playlist);
            res.status(201).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };

    find = async (req: Request, res: Response) => {
        try {
            const response = await this.service.find();
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: 'Não foi possível completar sua requisição' });
            console.log(error);
        }
    };

    findOne = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const response = await this.service.findOne(id);
            res.status(200).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };

    findSongs = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const response = await this.service.findSongs(id);
            res.status(200).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };

    findByUser = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const response = await this.service.findByUser(id);
            res.status(200).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };

    updateOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body;
        
        try {
            const response = await this.service.updateOne(id, payload);
            res.status(200).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };

    deleteOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        try {
            const response = await this.service.deleteOne(id);
            res.status(200).json(response);
        } catch (error) {
            const requestError = error as RequestError;
            res.status(requestError.code || 400).json({ error: requestError.message });
        }
    };
}