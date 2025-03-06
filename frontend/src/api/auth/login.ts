import { AuthResponse } from "../../interfaces/auth.types";
import { apiUrl } from "../utils/utils"

interface LoginData {
    email: string;
    password: string;
}

async function loginUser(formData: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        })
    })

    if (!response.ok) {
        throw new Error('Erro ao fazer login')
    }

    return await response.json()

}

export { loginUser }