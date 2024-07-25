export interface DeletedComment {
     
        id: string;
        text: string;
        authorName: string;
    
    
}

export interface DeletedCommentResponse {
    deleteComment: {
        comments: DeletedComment[]
    }
}