import { apiUrl } from "../utils/utils";

const toggleLikeRequest = (isLiked: boolean, playlistId: string, userId: string) => {
    if (isLiked) return deleteLike(playlistId, userId);
    return createLike(playlistId, userId);
}

const deleteLike = async (playlistId: string, userId: string) => {
    const response = await fetch(`${apiUrl}/like/?playlist=${playlistId}&user=${userId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error("Não foi possível obter playlist");
    }

    return;
}

const createLike = async (playlistId: string, userId: string) => {
    const response = await fetch(`${apiUrl}/like`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            playlistId
        })
    });

    if (!response.ok) {
        throw new Error("Não foi possível obter playlist");
    }

    return await response.json();
}

export { toggleLikeRequest }