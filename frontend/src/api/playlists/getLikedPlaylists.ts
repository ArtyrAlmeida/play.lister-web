import { Playlist } from "../../interfaces/playlist.types";
import { apiUrl } from "../utils/utils";

const getLikedPlaylists = async (userId: string): Promise<Playlist[]> => {
    const response = await fetch(`${apiUrl}/playlist/user/${userId}/liked`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error("Não foi possível obter playlist");
    }

    return await response.json();
}

export { getLikedPlaylists }

