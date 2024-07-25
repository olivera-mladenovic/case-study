export interface CreatedComment {
    comments: {
        text: string;
        authorName: string;
    }[]
}

export interface CreatedCommentResponse {
    createComment: CreatedComment;
}