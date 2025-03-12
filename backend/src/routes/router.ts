import { Router } from 'express';
import SongController from '../controllers/SongController';
import { UserController } from '../controllers/UserController';
import PlaylistController from '../controllers/PlaylistController';
import { LikeController } from '../controllers/LikeController';

const songsRouter = Router();
const songController = new SongController();

songsRouter.get('/', songController.find);
songsRouter.get('/:id', songController.findOne);
songsRouter.post('/', songController.create);

const userRouter = Router();
const userController = new UserController();

userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.get('/:id', userController.find);
userRouter.get('/analytics/:id', userController.analytics)

const playlistRouter = Router();
const playlistController = new PlaylistController();

playlistRouter.get('/', playlistController.find);
playlistRouter.get('/:id', playlistController.findOne);
playlistRouter.get('/songs/:id', playlistController.findSongs);
playlistRouter.get('/user/:id', playlistController.findByUser);
playlistRouter.get('/user/:id/liked', playlistController.find);
playlistRouter.post('/', playlistController.create);
playlistRouter.put('/:id', playlistController.updateOne)
playlistRouter.delete('/:id', playlistController.deleteOne);
playlistRouter.get("/month/:month", playlistController.findByMonth)

const likeRouter = Router();
const likeController = new LikeController();

likeRouter.get('/user/:id', likeController.findByUser);
likeRouter.post('/', likeController.create);
likeRouter.delete('/', likeController.deleteLike);

export { playlistRouter, userRouter, songsRouter, likeRouter };