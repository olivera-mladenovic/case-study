import { LoginInput, RegisterInput } from './types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../models/User.js';
import { UserInputError } from 'apollo-server';
import { validateRegisterInput } from './validators.js';

const Query = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch (e) {
                console.log(e)
            }
        },
    },
    Mutation: {
        async register(_, args: { registerInput: RegisterInput }, context, info) {
            const { email, name, password } = args.registerInput;
            validateRegisterInput(args.registerInput)
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new UserInputError(`User with emal: ${email} is already registered.`)
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword,
                name
            });
            await user.save();

            const token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name
            }, 'secret', { expiresIn: '24h' });

            return {
                id: user.id,
                email: user.email,
                name: user.name,
                token,
            }
        },

        async login(_, args: { loginInput: LoginInput }, context, info) {
            const {email, password} = args.loginInput;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User don't exist");
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new Error("Wrong password.")
            }
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name
            }, 'secret', { expiresIn: '24h' });

            return {
                id: user.id,
                email: user.email,
                name: user.name,
                token,
            }
        }
    }
}

export default Query;