import { gql } from "graphql-tag";

export const typeDefs = gql `
    type User {
        id: ID!
        name: String!
        password: String!
        email: String!
        photo: String
        biography: String
    }
    type Query {
        getUsers: [User!]
        getReviews(reviewFilter: ReviewFilter, pagination: PaginationFilter): PagedReviews
        getReview(id: ID!): Review!
        getCommentsByAuthor(authorId: ID!, pagination: PaginationFilter): PagedComments
    }
    type Mutation {
        register(registerInput: RegisterInput): RegistratedUser!
        login(loginInput: LoginInput): RegistratedUser!
        createReview(createReviewInput: CreateReviewInput): Review!
        deleteReview(id: ID!): Boolean!
        createComment(reviewId: ID!, text: String!): Review!
        deleteComment(reviewId: ID!, commentId: ID!): Review!
        markHelpful(id: ID!): Review!
        deleteAccount: Boolean!
    }
    type Review {
        id: ID!
        text: String!
        author: String!
        comments: [Comment]!
        book: String!
        helpfulMarks: [HelpfulMark]!
        user: User!
        createdAt: Float!
        commentsCount: Int!
        helpfulMarksCount: Int!
    }
    input ReviewFilter {
        authorId: ID
    }
    input PaginationFilter {
        limit: Int
        offset: Int
    }
    type PagedReviews {
        reviews: [Review]
        total: Int
    }
    type PagedComments {
        comments: [CommentWithReviewDetails]
        total: Int
    }
    type HelpfulMark {
        authorId: ID!
        authorName: String!
    }
    type Comment {
        id: ID!
        text: String!
        authorName: String!
        createdAt: Float!
    }
    type CommentWithReviewDetails {
        id: ID!
        text: String!
        authorName: String!
        createdAt: Float!
        author: String!
        book: String!
    }
    input CreateReviewInput {
        text: String!
        book: String!
        author: String!
    }
    input RegisterInput {
        name: String!
        password: String!
        confirmPassword: String!
        email: String!
        biography: String!
    }
    input LoginInput {
        email: String!
        password: String!
    }
    type RegistratedUser {
        id: ID!
        name: String!
        email: String!
        token: String!
    }
`;