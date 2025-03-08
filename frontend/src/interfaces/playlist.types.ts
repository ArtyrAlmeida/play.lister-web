interface Playlist {
    _id?: string,
    name: string,
    createdAt?: Date | string,
    author: string,
    authorName: string;
    songs: string[],
    image: string,
    usersLiked: string[],
}

export type { Playlist };