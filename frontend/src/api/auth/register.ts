import { AuthResponse } from "../../interfaces/auth.types";
import { apiUrl } from "../utils/utils"

interface RegisterData {
    email: string;
    password: string;
    name: string
    image: string;
}

async function registerUser(formData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            image: formData.image
        })
    })

    if (!response.ok) {
        throw new Error('Erro ao fazer register')
    }

    return await response.json()

}

export { registerUser }