export default {
    articles: `{
        articles: allArticles {
            id
            title
            image
            user {
                id
            }
        }
    }`,
    article: `query Article($id: ID!) {
        article: Article(id: $id) {
            id
            title
            url
            body
        }
    }`,
    user: `query User($email: String!) {
        user: User(email: $email) {
            id
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
            image
            email
        }    
    }`
}