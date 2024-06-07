import { model, Schema } from 'mongoose';

const reviewSchema = new Schema({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    comments: [
        {
            text: String,
            authorName: String
        }
    ]
});

const Review = model('Review', reviewSchema);

export default Review;