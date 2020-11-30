import gql from 'graphql-tag'
import { profileFragment, articleFragment } from './queries.js'

export const BUY = gql`
  mutation($slug: String!) {
    buy(article: { slug: $slug }) {
      id
      token
      owner {
        ${profileFragment}
      }
      article {
        ${articleFragment}
      }
    }
  }
`

export const REDEEM = gql`
  mutation($token: String!) {
    redeem(token: $token) {
      id
      token
      owner {
        ${profileFragment}
      }
    }
  }
`
