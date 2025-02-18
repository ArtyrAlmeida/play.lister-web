interface LoginAuthReponse {
    name: string;
    email: string;
    token: string;
    id: string;
    image?: string;
}

interface RegisterAuthResponse {
    name: string;
    email: string;
    token: string;
    id: string;
}

export type { LoginAuthReponse, RegisterAuthResponse }