import { ReviewInput } from './types';
import Review from '../../models/Review.js';
import auth from '../authentication.js';
import { AuthenticationError, UserInputError } from 'apollo-server';

const Query = {
    
    Query: {
        getReviews: async (_, { reviewFilter, pagination }) => {
            try {
                const query: any = {};
                if (reviewFilter?.authorId) {
                    query.user = reviewFilter.authorId;
                }
                const offset = pagination?.offset || 0;
                const limit = pagination?.limit || 20;
                const totalCount = await Review.countDocuments(query);
                const reviews = await Review.find(query)
                    .populate('user')
                    .lean()
                    .skip(offset)
                    .limit(limit)
                    .exec();
                const fullReviews = reviews.map((r: any) => {
                    r.commentsCount = r.comments.length;
                    r.helpfulMarksCount = r.helpfulMarks.length;
                    r.id = r._id;
                    r.comments = r.comments.map(c => {
                        const comment = {...c}
                        comment.id = c._id
                        return comment
                    })
                    r.user.id = r.user._id;
                    return r;
                })
                return {
                    reviews: fullReviews,
                    total: totalCount
                };
            } catch (e) {
                console.log(e);
            }
        },
        getReview: async (_, { id }) => {
            try {
                const r:any = await Review.findById(id).populate('user').lean().exec();
                r.commentsCount = r.comments.length;
                r.helpfulMarksCount = r.helpfulMarks.length;
                r.id = r._id;       
                r.comments = r.comments.map(c => {
                    const comment = {...c}
                    comment.id = c._id
                    return comment
                });
                r.user.id = r.user._id;
                return r;
            } catch (e) {
                console.log(e);
                
            }
        }
    },
    Mutation: {
        createReview: async (_, args: { createReviewInput: ReviewInput }, context) => {
            const { book, text, author } = args.createReviewInput;
            console.log(args.createReviewInput);
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
            console.log(args);
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
            const updatedObject = {
                ...review.toObject(),
                helpfulMarksCount: review.helpfulMarks.length
            }
            return updatedObject;
        }
    }
}

export default Query;