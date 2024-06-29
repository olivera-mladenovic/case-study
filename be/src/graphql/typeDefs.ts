import { gql } from "graphql-tag";

export const typeDefs = gql `
    type User {
        id: ID!
        name: String!
        password: String!
        email: String!
    }
    type Query {
        getUsers: [User!]
        getReviews: [Review]
        getReview(id: ID!): Review!
    }
    type Mutation {
        register(registerInput: RegisterInput): RegistratedUser!
        login(loginInput: LoginInput): RegistratedUser!
        createReview(createReviewInput: CreateRevewInput): Review!
        deleteReview(id: ID!): Boolean!
        createComment(reviewId: ID!, text: String!): Review!
        deleteComment(reviewId: ID!, commentId: ID!): Review!
        markHelpful(id: ID!): Review!
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
    }
    type HelpfulMark {
        id: ID!
        authorName: String!
    }
    type Comment {
        id: ID!
        text: String!
        authorName: String!
        createdAt: Float!
    }
    input CreateRevewInput {
        text: String!
        book: String!
    }
    input RegisterInput {
        name: String!
        password: String!
        confirmPassword: String!
        email: String!
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