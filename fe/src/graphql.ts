import { gql } from "@apollo/client";

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
`

export const GET_REVIEWS = gql`
{
    getReviews {
        id
        createdAt
        text
        book
        author
        commentsCount
        helpfulMarksCount
    }
}
`;

export const DELETE_REVIEW = gql`
mutation deleteReview(
    $id: ID!  
) {
    deleteReview(id: $id)
}
`