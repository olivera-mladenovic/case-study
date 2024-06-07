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
    }
    type Review {
        text: String!
        users: [User]
    }
`;