import { apiUrl } from "../utils/utils";

interface Results {
    labels: string[];
    values: number[];
}

interface Analytics {
    mostListened: Results;
    mostLiked: Results;
    playlistsCreated: Results;
}

const getAnalytics = async (userId: string): Promise<Analytics> => {
    const response = await fetch(`${apiUrl}/user/analytics/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error("Não foi possível obter playlist");
    }

    return await response.json();
}

export { getAnalytics }
