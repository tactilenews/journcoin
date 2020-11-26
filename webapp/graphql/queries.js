import gql from 'graphql-tag'

export const READ = gql`
  query($slug: String!) {
    read(slug: $slug) {
      id
      slug
      title
      teaser
      author {
        name
      }
    }
  }
`

export const ARTICLE_PREVIEW = gql`
  query {
    articles(stage: DRAFT, locales: en) {
      id
      title
      slug
      teaser
      journCoins {
        id
        owner {
          name
        }
      }
    }
  }
`

export const PROFILE = gql`
  query {
    profile {
      id
      name
      articles {
        id
        title
        slug
        teaser
        journCoins {
          token
        }
      }
      journCoins {
        token
        article {
          id
          title
          slug
          teaser
        }
      }
    }
  }
`
export const JOURNCOINS = gql`
  query {
    journCoins(stage: DRAFT, locales: en) {
      id
    }
  }
`