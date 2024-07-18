export interface CreatedReview {
    id: string;
    text: string;
    book: string;
    author: string;
}

export interface CreatedReviewResponse {
    createReview: CreatedReview;
}