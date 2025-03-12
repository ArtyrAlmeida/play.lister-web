import { PlaylistInterface } from '../interfaces';
import Like from '../models/Like';
import Playlist from '../models/Playlist';
import Song from '../models/Song';

export default class PlaylistRepository {
    async create(playlist: PlaylistInterface) {
        const createdPlaylist = await Playlist.create({...playlist});
        
        return createdPlaylist;
    }

    async find() {
        const result = await Playlist.find();

        return result;
    }

    async findOne(id: string) {
        const result = await Playlist.findOne({ _id: id });
        
        return result;
    }
    
    async findSongs(id: string) {
        const playlist = await this.findOne(id);
        const result = await Song.find({ _id: { $in: playlist?.songs } });
        
        return result;
    }

    async findPlaylistsByMonth(id: string, month: string) {
        const query: any = {
            $expr: {
              "$regexMatch": {
                "input": {
                  "$toString": "$createdAt"
                },
                "regex": new RegExp(month, "i")
              }
            }
        }

        if (id != "") query["author"] = id;

        const playlists = await Playlist.find(query);

        return playlists;
    }

    async findByUser(id: string) {
        const playlist = await this.findOne(id);
        const result = await Playlist.find({ author: id });
        
        return result;
    }

    async findUserLiked(id: string) {
        const likes = (await Like.find({ userId: id})).map((like) => like.playlistId)
        const likedPlaylists = await Playlist.find({ _id: likes })

        return likedPlaylists
    }

    async updateOne(id: string, payload: object) {
        const result = await Playlist.findOneAndUpdate({ _id: id }, payload);

        return result;
    }

    async deleteOne(id: string) {
        const result = await Playlist.deleteOne({ _id: id });

        return result;
    }

    async findPlaylistsLikedByUser(id: string) {
        const result = await Playlist.find({ usersLiked: id });

        return result;
    }
}