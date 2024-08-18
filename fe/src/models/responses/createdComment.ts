export interface CreatedComment {
    comments: {
        id: string;
        text: string;
        authorName: string;
        authorId: string;
    }[]
}

export interface CreatedCommentResponse {
    createComment: CreatedComment;
}