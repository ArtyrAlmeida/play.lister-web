import { Playlist } from "../../interfaces/playlist.types";
import { apiUrl } from "../utils/utils";

async function createOrEditPlaylist (playlist: Playlist, mode: "create" | "edit", id: string): Promise<Playlist> {
    const method = mode == "create" ? "POST" : "PUT";

    const response = await fetch(`${apiUrl}/playlist/${mode == "create" ? "" : id}`, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
    })

    if (!response.ok) {
        throw new Error('Erro ao fazer login')
    }

    return await response.json();
}

export { createOrEditPlaylist }