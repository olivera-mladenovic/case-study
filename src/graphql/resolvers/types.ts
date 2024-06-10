export interface RegisterInput {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface LoginInput {
    email: string;
    password: string;
}