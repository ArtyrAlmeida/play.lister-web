import { Song } from "../../interfaces/music.types";
import { apiUrl } from "../utils/utils";

const getAllSongs = async (): Promise<Song[]> => {
    const response = await fetch(`${apiUrl}/songs`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error("Não foi possível obter música");
    }

    return await response.json();
}

export { getAllSongs }

