import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation login(
    $email: String!  
    $password: String!
) {
    login(loginInput: {email: $email, password: $password}) {
        id email name token
    }
}
`;

export const REGISTER = gql`
mutation register(
    $email: String!
    $name: String!
    $password: String!
    $confirmPassword: String!
) {
    register(registerInput: {email: $email, name: $name, password: $password, confirmPassword: $confirmPassword}) {
        id email name token
    }
}
`;

export const CREATE_REVIEW = gql`
mutation createReview(
    $text: String!  
    $book: String!
    $author: String!
) {
    createReview(createReviewInput: {text: $text, book: $book, author: $author}) {
        id text book author createdAt
    }
}
`;

export const GET_ALL_REVIEWS = gql`
{
    getReviews {
        reviews {
            id
            createdAt
            text
            book
            author
            commentsCount
            helpfulMarksCount
        }
    }
}
`;

export const GET_FILTERED_REVIEWS = gql`
query getReviews($authorId: ID){
    getReviews(reviewFilter: {authorId:$authorId}, pagination: {limit: 3}) {
        reviews {
            book
            text
            author
            createdAt
            user {
                name
            }
        }
        total
    }
}
`;

export const DELETE_REVIEW = gql`
mutation deleteReview(
    $id: ID!  
) {
    deleteReview(id: $id)
}
`;
export const GET_SINGLE_REVIEW = gql`
query getReview($id: ID!){
    getReview(id: $id) {
        user {
            id
            name
        }
        comments {
            id
            authorName
            text
        }
        helpfulMarks {
            authorId
        }
        helpfulMarksCount
    }
}
`;

export const MARK_HELPFUL = gql`
mutation markHelpful($id:ID!) {
    markHelpful(id: $id) {
        helpfulMarksCount
    }
}
`;

export const CREATE_COMMENT = gql`
mutation createComment($reviewId: ID!, $text: String!) {
    createComment(reviewId: $reviewId, text: $text) {
        comments {
            id
            text
            authorName
        }
    }
}
`;

export const DELETE_COMMENT = gql`
mutation deleteComment($reviewId: ID!, $commentId: ID!) {
    deleteComment(reviewId: $reviewId, commentId: $commentId) {
        comments {
            id
            text
            authorName
        }
    }
}
`;

export const GET_USERS_COMMENTS = gql`
query getComments($authorId: ID!) {
    getCommentsByAuthor(authorId: $authorId, pagination: {limit: 3}) {
        comments {
            authorName
            text
            author
            book
            createdAt
        }
        total
    }
}
`;