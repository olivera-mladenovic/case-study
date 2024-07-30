import request from 'supertest';

const url = 'http://localhost:5001';

const registerInput = {
    registerInput: {
      name: 'Test',
      email: 'jest.test@example.com',
      password: 'pass',
      confirmPassword: 'pass'
    }
}

const loginInput = {
    loginInput: {
        email: 'jest.test@example.com',
        password: 'pass'
    }
}

const createReviewInput = {
    createReviewInput: {
        text: 'jest text',
        book: 'jest book',
        author: 'jest'
    }
}

let registratedUser;
let createdReview;
let createdCommentId;

const REGISTER_MUTATION = `
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      name
      email
      token
    }
  }
`;

const LOGIN_MUTATION = `
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
        id
        name
        email
        token
    }
  }
`;

const CREATE_REVIEW_MUTATION = `
  mutation createReview($createReviewInput: CreateReviewInput) {
    createReview(createReviewInput: $createReviewInput) {
        id
        text
        book
    }
  }
`;

const DELETE_REVIEW_MUTATION = `
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

const CREATE_COMMENT_MUTATION = `
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

const DELETE_COMMENT_MUTATION = `
    mutation deleteComment($reviewId: ID!, $commentId: ID!) {
        deleteComment(reviewId: $reviewId, commentId: $commentId) {
            id
            comments {
                id
            }
        }
    }
`;

const MARK_HELPFUL_MUTATION = `
    mutation markHelpful($id: ID!) {
        markHelpful(id: $id) {
            helpfulMarksCount
        }
    }
`;

test('Register', async() => {
    const response = await request(url)
      .post('/')
      .send({
        query: REGISTER_MUTATION,
        variables: registerInput
      });
  
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.register).toBeDefined();
    expect(response.body.data.register.name).toBe('Test');
    expect(response.body.data.register.email).toBe('jest.test@example.com');
    expect(response.body.data.register.token).toBeDefined();
    registratedUser = response.body.data.register;
});

test('Login', async () => {
    const response = await request(url)
        .post('/')
        .send({
            query: LOGIN_MUTATION,
            variables: loginInput
        });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.login).toBeDefined();
    expect(response.body.data.login.name).toBe('Test');
    expect(response.body.data.login.email).toBe('jest.test@example.com');
    expect(response.body.data.login.token).toBeDefined();
});

test('Create Review', async () => {
    const response = await request(url)
    .post('/')
    .set('Authorization', `Bearer ${registratedUser.token}`)
    .send({
        query: CREATE_REVIEW_MUTATION,
        variables: createReviewInput
    });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.createReview).toBeDefined();
    expect(response.body.data.createReview.text).toBe('jest text');
    expect(response.body.data.createReview.book).toBe('jest book');
    createdReview = response.body.data.createReview;
});

test('Create Comment on Review', async () => {
    const response = await request(url)
    .post('/')
    .set('Authorization', `Bearer ${registratedUser.token}`)
    .send({
        query: CREATE_COMMENT_MUTATION,
        variables: {
            reviewId: createdReview.id,
            text: 'jest comment'
        }
    });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.createComment).toBeDefined();
    expect(response.body.data.createComment.comments.length).toBeGreaterThan(0);
    expect(response.body.data.createComment.comments[0].text).toBe('jest comment');
    createdCommentId = response.body.data.createComment.comments[0].id;
});

test('Delete Comment on Review', async () => {
    const response = await request(url)
    .post('/')
    .set('Authorization', `Bearer ${registratedUser.token}`)
    .send({
        query: DELETE_COMMENT_MUTATION,
        variables: {
            reviewId: createdReview.id,
            commentId: createdCommentId
        }
    });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.deleteComment).toBeDefined();
    expect(response.body.data.deleteComment.comments.length).toBe(0);
});

test('Mark Helpful Review', async () => {
    const response = await request(url)
    .post('/')
    .set('Authorization', `Bearer ${registratedUser.token}`)
    .send({
        query: MARK_HELPFUL_MUTATION,
        variables: {
            id: createdReview.id
        }
    });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.markHelpful).toBeDefined();
    expect(response.body.data.markHelpful.helpfulMarksCount).toBe(1);
});

test('Delete Review', async () => {
    const response = await request(url)
    .post('/')
    .set('Authorization', `Bearer ${registratedUser.token}`)
    .send({
        query: DELETE_REVIEW_MUTATION,
        variables: {
            id: createdReview.id
        }
    });
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.deleteReview).toBe(true);
});