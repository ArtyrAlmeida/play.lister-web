import { Router } from 'express';
import SongController from '../controllers/SongController';
import { UserController } from '../controllers/UserController';
import requireBasicAuth from '../middleware/requireAuth';
import PlaylistController from '../controllers/PlaylistController';

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

const playlistRouter = Router();
const playlistController = new PlaylistController();

playlistRouter.get('/', playlistController.find);
playlistRouter.get('/:id', playlistController.findOne);
playlistRouter.get('/songs/:id', playlistController.findSongs);
playlistRouter.get('/user/:id', playlistController.findByUser);
playlistRouter.post('/', playlistController.create);
playlistRouter.put('/:id', playlistController.updateOne)
playlistRouter.delete('/:id', playlistController.deleteOne);
export { playlistRouter, userRouter, songsRouter };