export default {
    articles: `{
        articles: allArticles {
            id
            title
            image
            user {
                id
                image
                firstName
                lastName
            }
            createdAt
        }
    }`,
}