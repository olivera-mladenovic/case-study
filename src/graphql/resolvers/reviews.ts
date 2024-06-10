import { ReviewInput } from './types';
import Review from '../../models/Review.js';
import auth from '../authentication.js';

const Query = {
    Query: {  
        async getReviews() {
            try {
                const reviews = await Review.find();
                return reviews;
            } catch(e) {
                console.log(e);
            }
        },
        async getReview(_, {id}) {
            try {
                const review = await Review.findById(id);
                return review;
            } catch(e) {
                console.log(e);
            }
        }
    },
    Mutation: {
        async createReview(_, args: {createReviewInput: ReviewInput}, context) {
            const {book, text} = args.createReviewInput;
            const user = auth(context) as any;
            const newReview = new Review({
                book,
                text,
                user: user.id,
                authorName: user.name
            })
            const review = await newReview.save();
            return review;
        }
    }
}

export default Query;