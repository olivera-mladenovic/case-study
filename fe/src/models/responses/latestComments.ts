export interface LatestComments {
    comments: {
        authorName: string;
        text: string;
        author: string;
        book: string;
        createdAt: number;
    }[];
    total: number;
}

export interface LatestCommentsResponse {
    getCommentsByAuthor: LatestComments
}