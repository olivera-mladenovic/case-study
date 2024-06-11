import { UserInputError } from 'apollo-server';
import Review from '../../models/Review.js';
import auth from '../authentication.js';

const Query = {
    Mutation: {
        createComment: async (_, { reviewId, text }, context) => {
            const user = auth(context) as any;
            const review = await Review.findById(reviewId);
            if (!review) throw new UserInputError("Bad request. Review not found.");
            review.comments.unshift({
                text,
                authorName: user.name
            });
            await review.save();
            return review;
        },
        deleteComment: async (_, { reviewId, commentId }, context) => {
            const user = auth(context) as any;
            const review = await Review.findById(reviewId);
            if (!review) throw new UserInputError("Bad request. Review not found.");
            const commentIndex = review.comments.findIndex(c => c.id === commentId);
            if (commentIndex === -1) throw new UserInputError("Comment doesn't exist.")
            review.comments.splice(commentIndex, 1);
            await review.save();
            return review;
        }

    }
}

export default Query;