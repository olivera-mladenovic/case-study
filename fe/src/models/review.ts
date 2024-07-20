export interface Review {
    id: string;
    createdAt: string;
    text: string;
    book: string;
    author: string;
    commentsCount: number;
    helpfulMarksCount: number;
}