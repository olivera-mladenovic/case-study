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
    type Mutation {
        register(registerInput: RegisterInput): RegistratedUser!
        login(loginInput: LoginInput): RegistratedUser!
    }
    type Review {
        text: String!
        users: [User]
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