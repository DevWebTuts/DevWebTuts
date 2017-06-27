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
  saveArticle: `mutation SaveArticle($id: ID!, $body: String, $image: String, $title: String!,$userId: ID) {
  article: updateOrCreateArticle(update: {id: $id, body: $body, image: $image, title: $title, userId: $userId}, create: {body: $body, image: $image, title: $title, userId: $userId}) {
    id
  }
}`,
  saveComment: `mutation SaveComment($id: ID!, $body: String!, $userId: ID!, $articleId: ID!) {
  comment: updateOrCreateComment(update: {id: $id, body: $body, userId: $userId, articleId: $articleId}, create: {body: $body, userId: $userId, articleId: $articleId}) {
    id
  }
}`,
  saveReply: `mutation SaveReply($id: ID!, $body: String!, $userId: ID!, $commentId: ID!) {
  reply: updateOrCreateReply(update: {id: $id, body: $body, userId: $userId, commentId: $commentId}, create: {body: $body, userId: $userId, commentId: $commentId}) {
    id
  }
}`
}