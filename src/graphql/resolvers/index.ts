import userResolvers from './users.js';
import reviewResolvers from './reviews.js';
import commentResolvers from './comments.js';

const Query = {
    Query: {
        ...userResolvers.Query,
        ...reviewResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...reviewResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}
export default Query;