export default {
    articles: `{
        articles: allArticles {
            id
            title
            image
            user {
                id
                email
            }
        }
    }`,
    article: `query Article($id: ID!) {
        article: Article(id: $id) {
            id
            title
            body
        }
    }`,
    user: `query User($email: String!) {
        user: User(email: $email) {
            id
            email
            image
            firstName
            middleName
            lastName
        }
    }`,
    currentUser: `{
        currentUser: user {
            id
            firstName
            lastName
            middleName
            email
            image
        }    
    }`
}
