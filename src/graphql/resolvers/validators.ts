import { UserInputError } from 'apollo-server';
import { LoginInput, RegisterInput } from './types';

export const validateRegisterInput = (registerInput: RegisterInput) => {
    const {email, password, confirmPassword, name} = registerInput;
    if (!email || password !==confirmPassword || !name) {
        throw new UserInputError('Bad input fields.');
    }
}

export const validateLoginInput = (loginInput: LoginInput) => {
    const {email, password} = loginInput;
    if (!email || !password) {
        throw new UserInputError('Bad input fields.');
    }
}