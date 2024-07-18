import { ReviewInput } from './types';
import Review from '../../models/Review.js';
import auth from '../authentication.js';
import { AuthenticationError, UserInputError } from 'apollo-server';

const Query = {
    
    Query: {
        getReviews: async () => {
            try {
                const reviews = await Review.find().populate('user').exec();
                return reviews;
            } catch (e) {
                console.log(e);
            }
        },
        getReview: async (_, { id }) => {
            try {
                const review = await Review.findById(id);
                return review;
            } catch (e) {
                console.log(e);
                
            }
        }
    },
    Mutation: {
        createReview: async (_, args: { createReviewInput: ReviewInput }, context) => {
            const { book, text, author } = args.createReviewInput;
            const user = auth(context) as any;
            const newReview = new Review({
                book,
                text,
                author,
                user: user.id,
                createdAt: Date.now()
            })
            const review = await newReview.save();
            return review;
        },
        deleteReview: async (_, args: { id: string }, context) => {
            const { id } = args;
            const user = auth(context) as any;
            const review = await Review.findById(id).populate('user').exec();
            if (review.user.id !== user.id) throw new AuthenticationError("Not authorized to delete.");
            try {
                await Review.findByIdAndDelete(id);
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        },
        markHelpful: async (_, { id }, context) => {
            const user = auth(context) as any;
            const review = await Review.findById(id);
            if (!review) throw new UserInputError("Bad request. Review doesn't exist.");
            const markExists = review.helpfulMarks.find(mark => mark.authorId === user.id);

            if (markExists) {
                const markIndex = review.helpfulMarks.findIndex(c => c.authorId === user.id);
                review.helpfulMarks.splice(markIndex, 1);

            } else {
                review.helpfulMarks.push({
                    authorId: user.id,
                    authorName: user.name
                })
            }
            await review.save();
            return review;
        }
    }
}

export default Query;