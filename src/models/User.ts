import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    name: String,
    password: String,
    email: String
})

const User = model('User', userSchema);

export default User;