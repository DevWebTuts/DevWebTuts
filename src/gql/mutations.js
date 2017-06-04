export default {
    createUser: `mutation CreateUser(
                            $email: String!,
                            $password: String!){
  user: createUser(
    authProvider: {
      email: {
        email: $email
        password: $password
      }
    }) {
        id
        email
    }
}`,
  signInUser: `mutation SignInUser($email: String!,
  									$password: String!) {
  user: signinUser(email: {
    	email: $email,
    	password: $password
  	}) {
    token
    user {
      email
      image
      id
    }
  }
}`
}
