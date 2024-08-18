import { UserInputError } from 'apollo-server';
import Review from '../../models/Review.js';
import auth from '../authentication.js';

const Query = {
    Query: {
        getCommentsByAuthor: async (_, {authorId, pagination}, context) => {
            try {
                const limit = pagination?.limit || 20;
                const totalCount = await Review.find({
                    comments: {
                        $elemMatch: {
                            authorId: authorId
                        }
                    }
                }).exec();
                
                const commentsByAuthor = await Review.aggregate([
                    {
                      $unwind: "$comments"
                    },
                    {
                      $match: {
                        "comments.authorId": authorId 
                      }
                    },
                    {
                      $sort: {
                        "comments.createdAt": -1 
                      }
                    },
                    {
                      $project: {
                        _id: 0,
                        text: "$comments.text",
                        authorName: "$comments.authorName",
                        authorId: "$comments.authorId",
                        createdAt: "$comments.createdAt",
                        book: 1,
                        author:1
                      }
                    },
                    {
                        $limit: limit
                    }
                  ]).exec();

                  return {
                    comments: commentsByAuthor,
                    total: totalCount.length
                  }

            } catch(e) {
                console.log(e)
            }
        }
    },
    Mutation: {
        createComment: async (_, { reviewId, text }, context) => {
            const user = auth(context) as any;
            const review = await Review.findById(reviewId);
            if (!review) throw new UserInputError("Bad request. Review not found.");
            review.comments.unshift({
                text,
                authorName: user.name,
                authorId: user.id,
                createdAt: Date.now()
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