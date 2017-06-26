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
}`
}