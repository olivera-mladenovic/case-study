import { model, Schema } from 'mongoose';

const reviewSchema = new Schema({
    text: String,
    createdAt: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            text: String,
            authorName: String,
            authorId: String,
            createdAt: Number
        }
    ],
    book: String,
    author: String,
    helpfulMarks: [{
        authorName: String,
        authorId: String
    }]
});

const Review = model('Review', reviewSchema);

export default Review;