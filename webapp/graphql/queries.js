import gql from 'graphql-tag'

export const READ = gql`
  query($slug: String!) {
    read(slug: $slug) {
      id
      slug
      title
      teaser
      originalURL
      text {
        markdown
      }
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
      bought
    }
  }
`

export const PROFILE = gql`
  query {
    profile {
      id
      name
      expenses
      revenues
      articles {
        id
        revenues
        title
      }
    }
  }
`
export const JOURNCOINS = gql`
  query {
    journCoins(stage: DRAFT, locales: en) {
      token
    }
  }
`
