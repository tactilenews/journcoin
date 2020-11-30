import gql from 'graphql-tag'
export const articleFragment = `
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
`
export const profileFragment = `
  id
  name
  expenses
  revenues
  journCoins {
    id
    token
    article {
      id
      slug
    }
  }
  articles {
    id
    revenues
    title
  }
`

export const READ = gql`
  query($slug: String!) {
    article(where: { slug: $slug }) {
      ${articleFragment}
      bought
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
      ${profileFragment}
    }
  }
`
