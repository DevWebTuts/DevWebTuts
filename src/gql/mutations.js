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
  createArticle: `mutation AddArticle($url: String!, $title: String!, $image: String, $body: String) {
  article: createArticle(url: $url, title: $title, image: $image, body: $body) {
    url
    id
    title
    image
    body
  }
}`
}