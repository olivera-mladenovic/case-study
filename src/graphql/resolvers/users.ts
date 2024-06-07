import User from '../../models/User.js';

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
    }
}

export default Query;