export interface CreatedComment {
    comments: {
        id: string;
        text: string;
        authorName: string;
    }[]
}

export interface CreatedCommentResponse {
    createComment: CreatedComment;
}