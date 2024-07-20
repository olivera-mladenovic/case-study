export interface CreatedReview {
    id: string;
    text: string;
    book: string;
    author: string;
    commentsCount: number;
    helpfulMarksCount: number;
}

export interface CreatedReviewResponse {
    createReview: CreatedReview;
}