export default {
    users: `query Users($first: Int, $skip: Int, $search: String) {
       users: allUsers(first: $first, skip: $skip, orderBy: createdAt_DESC, filter: {firstName_contains: $search}) {
           id
           firstName
           middleName
           lastName
           image
           createdAt
       } 
    }`,
    usersCount: `query UsersCount($first: Int, $skip: Int, $search: String) {
       count: _allUsersMeta(first: $first, skip: $skip, orderBy: createdAt_DESC, filter: {firstName_contains: $search}) {
           count
       } 
    }`,
    articles: `query Articles($first: Int, $skip: Int, $search: String) {
        articles: allArticles(first: $first, skip: $skip, orderBy: createdAt_DESC, filter: {title_contains: $search, published: true}) {
            id
            title
            image
            published
            user {
                id
                image
                firstName
                lastName
            }
            createdAt
        }
    }`,
    articlesCount: `query ArticlesCount($first: Int, $skip: Int, $search: String,) {
        count: _allArticlesMeta(first: $first, skip: $skip, orderBy: createdAt_DESC, filter: {title_contains: $search, published: true}) {
            count
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
            published
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
    user: `query User($id: ID!, $first: Int, $skip: Int) {
        user: User(id: $id) {
            id
            email
            image
            firstName
            middleName
            lastName
            admin
            articleCount: _articlesMeta(first: $first, skip: $skip) {
                count
            }
            articles(first: $first, skip: $skip, orderBy: createdAt_DESC) {
                id
                title
                image
                createdAt
                updatedAt
                published
                user {
                    id
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
    createdAt
    updatedAt
    admin
    articleCount: _articlesMeta(first: $first, skip: $skip) {
      count
    }
    articles(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      image
      createdAt
      updatedAt
      published
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