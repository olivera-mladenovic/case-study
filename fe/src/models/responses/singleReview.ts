export interface SingleReview {
    comments?: {
        id: string;
        authorName: string;
        text: string;
    }[];
    user?: {
        id: string;
        name: string;
    };
    helpfulMarks?: {
        authorId: string;
    }[];
    helpfulMarksCount?: number;
}

export interface SingleReviewResponse {
    getReview: SingleReview;
}