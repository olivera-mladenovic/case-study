export interface SingleReview {
    comments: {
        authorName: string;
        text: string;
    }[];
    user: {
        id: string;
        name: string;
    };
    helpfulMarks: {
        authorId: string;
    }[]
}

export interface SingleReviewResponse {
    getReview: SingleReview;
}