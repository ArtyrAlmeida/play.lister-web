interface FindUserResponse{
	name: string;
    email: string;
    id: string;
    image: string;
		favoriteGenres: string[];
}

export type { FindUserResponse }