import { RegistratedUser } from "../responses";

export interface UserContextData {
    user: RegistratedUser | null;
    loginUser: (user: RegistratedUser) => void;
    logoutUser: () => void;
    amIAuthor: (authorId: string | undefined) => boolean;
}