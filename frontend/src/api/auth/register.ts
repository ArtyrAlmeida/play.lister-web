import { RegisterAuthResponse } from "../../interfaces/auth.types";
import { apiUrl } from "../utils/utils"

interface RegisterData {
    email: string;
    password: string;
    name: string
}

async function registerUser(formData: RegisterData): Promise<RegisterAuthResponse> {
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name
        })
    })

    if (!response.ok) {
        throw new Error('Erro ao fazer login')
    }

    return await response.json()

}

export { registerUser }