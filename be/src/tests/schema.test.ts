const { gql } = require('graphql-tag');
const { typeDefs } = require('../graphql/typeDefs');

const expectedUserSchema = gql`
  type User {
    id: ID!
    name: String!
    password: String!
    email: String!
  }
`;

const expectedReviewSchema = gql`
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
`;

const expectedHelpfulMarkSchema = gql`
 type HelpfulMark {
        authorId: ID!
        authorName: String!
  }
`;

const expectedCommentSchema = gql`
type Comment {
        id: ID!
        text: String!
        authorName: String!
        createdAt: Float!
}`
;

const expectedRegistratedUserSchema = gql`
type RegistratedUser {
        id: ID!
        name: String!
        email: String!
        token: String!
}
`;

function getTypeDef(parsedSchema, typeName) {
  return parsedSchema.definitions.find(
    def => def.kind === 'ObjectTypeDefinition' && def.name.value === typeName
  );
}

test('Check user schema', () => {
  const userType = getTypeDef(typeDefs, 'User');
  expect(userType).toBeDefined();
  expect(userType).toEqual(expectedUserSchema.definitions[0]);
});

test('Check review schema', () => {
  const reviewSchema = getTypeDef(typeDefs, 'Review');
  expect(reviewSchema).toBeDefined();
  expect(reviewSchema).toEqual(expectedReviewSchema.definitions[0]);
});

test('Check helpful mark schema', () => {
  const helpfulMarkSchema = getTypeDef(typeDefs, 'HelpfulMark');
  expect(helpfulMarkSchema).toBeDefined();
  expect(helpfulMarkSchema).toEqual(expectedHelpfulMarkSchema.definitions[0]);
});

test('Check comment schema', () => {
  const commentSchema = getTypeDef(typeDefs, 'Comment');
  expect(commentSchema).toBeDefined();
  expect(commentSchema).toEqual(expectedCommentSchema.definitions[0]);
});

test('Check registrated user schema', () => {
  const registratedUserSchema = getTypeDef(typeDefs, 'RegistratedUser');
  expect(registratedUserSchema).toBeDefined();
  expect(registratedUserSchema).toEqual(expectedRegistratedUserSchema.definitions[0]);
});
