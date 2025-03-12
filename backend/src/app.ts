import express, { Request, Response } from 'express';
import { likeRouter, playlistRouter, songsRouter, userRouter } from './routes/router';
import{ connectMongo } from './database/database';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json('Running');
});

app.use((req, res, next) => {
    console.log(req.method + ": " + req.path);
    next()
})

app.use('/songs', songsRouter);
app.use('/user', userRouter);
app.use('/playlist', playlistRouter);
app.use('/like', likeRouter);

connectMongo();

export { app };
