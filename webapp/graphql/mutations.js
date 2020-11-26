import gql from 'graphql-tag'

export const BUY = gql`
  mutation($id: ID!, $token: String!) {
    buy(id: $id, token: $token) {
      token
      article {
        id
      }
    }
  }
`
