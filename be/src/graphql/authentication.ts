import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

const auth = (context) => {
    const authHeader = context.req.headers.authorization;
    console.log(`auth header je ${authHeader}`)
    if (!authHeader) throw new AuthenticationError("No authorization header found.");
    const token = authHeader.split(" ")[1];
    if (!token) throw new AuthenticationError("No token found.");
    try {
        const user = jwt.verify(token, 'secret');
        return user;
    } catch(e) {
        throw new AuthenticationError("Invalid token.")
    }
}

export default auth;