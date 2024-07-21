export interface SingleReview {
    comments: {
        authorName: string;
        text: string;
    }[];
    user: {
        id: string;
        name: string;
    }
}

export interface SingleReviewResponse {
    getReview: SingleReview;
}