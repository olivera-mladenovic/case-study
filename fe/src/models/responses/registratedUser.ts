
export interface RegistratedUser {
    id: string;
    name: string;
    email: string;
    token: string;
}

export interface LoginUserResponse {
    login: RegistratedUser;
}

export interface RegisterUserResponse {
    register: RegistratedUser;
}