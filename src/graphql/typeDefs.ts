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
    }
    type Review {
        text: String!
        authorName: String!
        comments: [Comment]
        book: String!
    }
    type Comment {
        text: String!
        authorName: String!
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