import songs from "../dbCollections/songs.json";
import users from "../dbCollections/users.json";
import playlists from "../dbCollections/playlists.json";

import Song from "../models/Song";
import User from "../models/User";
import Plalist from "../models/Playlist";

const populateSongs = async () => {
    await Song.deleteMany({});
    const addedSongs = await Song.insertMany(songs);
    const songsIds = addedSongs.map(song => song._id);

    const mockUsersEmails = users.map(user => user.email)
    await User.deleteMany({ email: { $in: mockUsersEmails } });
    const addedUsers = await User.insertMany(users);

    const ownedPlaylists = playlists.map((playlist, index) => {
        const user = addedUsers[index];
        return {
            ...playlist,
            author: user._id,
            authorName: user.name,
            songs: songsIds
        }
    });

    const mockPlaylistsAuthor = playlists.map(playlist => playlist.authorName)
    await Plalist.deleteMany({ authorName: { $in: mockPlaylistsAuthor } })
    await Plalist.insertMany(ownedPlaylists);

    console.log("Database populated")
}

export { populateSongs }