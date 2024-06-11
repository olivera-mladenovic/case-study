import { model, Schema } from 'mongoose';

const reviewSchema = new Schema({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            text: String,
            authorName: String
        }
    ],
    authorName: String,
    book: String,
    helpfulMarks: [{
        authorName: String,
        authorId: String
    }]
});

const Review = model('Review', reviewSchema);

export default Review;