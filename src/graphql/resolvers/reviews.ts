import { ReviewInput } from './types';
import Review from '../../models/Review.js';
import auth from '../authentication.js';
import { AuthenticationError, UserInputError } from 'apollo-server';

const Query = {
    Query: {
        async getReviews() {
            try {
                const reviews = await Review.find();
                return reviews;
            } catch (e) {
                console.log(e);
            }
        },
        async getReview(_, { id }) {
            try {
                const review = await Review.findById(id);
                return review;
            } catch (e) {
                console.log(e);
            }
        }
    },
    Mutation: {
        async createReview(_, args: { createReviewInput: ReviewInput }, context) {
            const { book, text } = args.createReviewInput;
            const user = auth(context) as any;
            const newReview = new Review({
                book,
                text,
                user: user.id,
                authorName: user.name
            })
            const review = await newReview.save();
            return review;
        },
        async deleteReview(_, args: { id: string }, context) {
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
        async markHelpful(_, { id }, context) {
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