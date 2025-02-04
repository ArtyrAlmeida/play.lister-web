import express, { Request, Response } from 'express';
import { playlistRouter, songsRouter, userRouter } from './routes/router';
import{ connectMongo } from './database/database';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json('Running');
});

app.use('/songs', songsRouter);
app.use('/user', userRouter);
app.use('/playlist', playlistRouter)

connectMongo();

export { app };
