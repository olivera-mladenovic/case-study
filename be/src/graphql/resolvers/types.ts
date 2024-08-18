export interface RegisterInput {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    biography: string
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface ReviewInput {
    text: string;
    book: string;
    author: string;
}