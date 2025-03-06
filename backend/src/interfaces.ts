interface SongInterface {
    _id?: string,
    name: string,
    length: string,
    author: string,
    image: string,
}

interface PlaylistInterface {
    _id?: string,
    name: string,
    createdAt?: Date | string,
    author: string,
    songs: string[],
    image: string,
}

interface UserInterface {
    _id?: string,
    name: string,
    email: string,
    password: string,
    playlists?: string[],
    image: string,
}

interface LikeInterface {
    _id?: string;
    userId: string;
    playlistId: string;
}

interface LoginInfo {
    email: string,
    password: string,
}


export { SongInterface, UserInterface, LoginInfo, PlaylistInterface, LikeInterface };