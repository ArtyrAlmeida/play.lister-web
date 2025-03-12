import { FindUserResponse } from "../../interfaces/user.types";
import { apiUrl } from "../utils/utils"

async function findUser(userId: string): Promise<FindUserResponse> {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error('Erro ao buscar gêneros favoritos')
    }

    return await response.json()

}

export { findUser }