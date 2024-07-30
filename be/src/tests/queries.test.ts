import request from 'supertest';

const url = 'http://localhost:5001';
let reviewId;

const GET_USERS = `
  query getUsers {
    getUsers {
      id
      name
      email
    }
  }
`;

const GET_REVIEWS = `
query getReviews {
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

const GET_SINGLE_REVIEW = `
query getReview($id:ID!) {
  getReview(id: $id) {
  id
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
`


test('Fetch users', async () => {
  const response = await request(url)
    .post('/')
    .send({
      query: GET_USERS
    });

  expect(response.body.errors).toBeUndefined();
  expect(response.body.data.getUsers).toBeDefined();
  expect(response.body.data.getUsers.length).toBeGreaterThan(0);
});

test('Fetch reviews', async () => {
  const response = await request(url)
    .post('/')
    .send({
      query: GET_REVIEWS
    });
  expect(response.body.errors).toBeUndefined();
  expect(response.body.data.getReviews).toBeDefined();
  expect(response.body.data.getReviews.length).toBeGreaterThan(0);
  reviewId = response.body.data.getReviews[0].id;
});

test('Fetch single review', async () => {
  const singleReviewResponse = await request(url)
  .post('/')
  .send({
    query: GET_SINGLE_REVIEW,
    variables: {id: reviewId}
  });

  expect(singleReviewResponse.body.errors).toBeUndefined();
  expect(singleReviewResponse.body.data.getReview).toBeDefined();
  expect(singleReviewResponse.body.data.getReview.id).toBe(reviewId);
});
