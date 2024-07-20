import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
mutation createReview(
    $text: String!  
    $book: String!
    $author: String!
) {
    createReview(createReviewInput: {text: $text, book: $book, author: $author}) {
        text book author createdAt
    }
}
`

export const GET_REVIEWS = gql`
{
    getReviews {
        createdAt
        text
        book
        author
        commentsCount
        helpfulMarksCount
    }
}
`;