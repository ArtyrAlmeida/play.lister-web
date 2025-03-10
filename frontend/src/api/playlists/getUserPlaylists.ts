import { Playlist } from "../../interfaces/playlist.types";
import { apiUrl } from "../utils/utils";

const getUserPlaylists = async (userId: string): Promise<Playlist[]> => {
    const response = await fetch(`${apiUrl}/playlist/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error("Não foi possível obter playlist");
    }

    return await response.json();
}

export { getUserPlaylists }

