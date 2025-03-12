import { apiUrl } from "../utils/utils";

export interface UpdateUserData{
	name: string;
	image: string;
	favoriteGenres: string[];
}

export async function updateUser(id: string, data: UpdateUserData) {
		const response = await fetch(`${apiUrl}/user/update/${id}`, {
				method: 'PUT',
				headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
		})

		if (!response.ok) {
				throw new Error('Erro ao atualizar o perfil')
		}
}