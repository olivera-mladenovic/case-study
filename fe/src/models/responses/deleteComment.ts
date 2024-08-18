export interface DeletedComment {
    id: string;
    text: string;
    authorName: string;
    authorId: string;
}

export interface DeletedCommentResponse {
    deleteComment: {
        comments: DeletedComment[]
    }
}