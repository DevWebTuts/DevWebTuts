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
    article: `query Article($id: ID!) {
        article: Article(id: $id) {
            id
            title
            image
            body
            createdAt
            updatedAt
            user {
                id
                email
                firstName
                middleName
                lastName
                image
            }
            comments {
                id
                body
                createdAt
                user {
                    id
                    firstName
                    image
                }
                replies {
                    id
                    body
                    createdAt
                    user {
                        id
                        firstName
                        image
                    }
                }
            }

        }
    }`,
    user: `query User($id: ID!) {
        user: User(id: $id) {
            id
            email
            image
            firstName
            middleName
            lastName
            articles {
                id
                title
                image
                user {
                    id
                    email
                    image
                    firstName
                    middleName
                    lastName
                }
            }
        }
    }`,
    currentUser: `query CurrentUser($first: Int, $skip: Int) {
  currentUser: user {
    id
    firstName
    lastName
    middleName
    image
    email
    articleCount: _articlesMeta {
      count
    }
    articles(first: $first, skip: $skip)  {
      id
      title
      image
      createdAt
      updatedAt
      user {
          id
          image
          firstName
          middleName
          lastName
      }
    }
  }
}`
}