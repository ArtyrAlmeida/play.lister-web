import { Playlist } from "../../interfaces/playlist.types";
import { apiUrl } from "../utils/utils";

const getPlaylistsByMonth = async (): Promise<Playlist[]> => {
    const today = new Date();
    const monthNumber = today.getMonth() + 1;
    const monthString = monthNumber > 9 ? monthNumber.toString() : "0" + monthNumber.toString();
    const month = `${today.getFullYear()}-${monthString}`
    const response = await fetch(`${apiUrl}/playlist/month/${month}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error("Não foi possível obter playlist");
    }

    return await response.json();
}

export { getPlaylistsByMonth }

