export default {
  createUser: `mutation CreateUser($idToken: String!, $firstName: String, $middleName: String, $lastName: String, $image: String) {
  user: createUser(authProvider: {auth0: {idToken: $idToken}}, firstName: $firstName, middleName: $middleName, lastName: $lastName, image: $image) {
    id
  }
}
`,
  signInUser: `mutation SignInUser($idToken: String!) {
  user: signinUser(auth0: {idToken: $idToken}) {
    token
    user {
      firstName
      image
    }
  }
}`,
  deleteArticle: `mutation DeleteArticle($id: ID!) {
    article: deleteArticle(id: $id) {
      id
    }
  }`,
  updateArticle: `mutation UpdateArticle($id: ID!, $body: String, $image: String, $title: String, $published: Boolean,$userId: ID) {
    article: updateArticle(id: $id, body: $body, image: $image, title: $title, published: $published, userId: $userId) {
      id
    }
  }`,
  createArticle: `mutation CreateArticle($body: String, $image: String, $title: String!,$userId: ID) {
    article: createArticle(body: $body, image: $image, title: $title, userId: $userId) {
      id
    }
  }`,
  createComment: `mutation CreateComment($body: String!, $userId: ID!, $articleId: ID!) {
    comment: createComment(body: $body, userId: $userId, articleId: $articleId) {
      id
    }
  }`,
  createReply: `mutation CreateReply($body: String!, $userId: ID!, $commentId: ID!) {
    reply: createReply(body: $body, userId: $userId, commentId: $commentId) {
      id
    }
  }`
}