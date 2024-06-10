import { ReviewInput } from './types';
import Review from '../../models/Review.js';
import auth from '../authentication.js';
import { AuthenticationError } from 'apollo-server';

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
        }
    }
}

export default Query;