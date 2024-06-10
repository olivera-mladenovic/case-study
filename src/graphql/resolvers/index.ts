import userResolvers from './users.js';
import reviewResolvers from './reviews.js';

const Query = {
    Query: {
        ...userResolvers.Query,
        ...reviewResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}
export default Query;