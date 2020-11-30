import { gql } from 'apollo-server';

const typeDefs = gql`
type Query {
  profile: Person
}

type Mutation {
  buy(article: ArticleWhereUniqueInput!): JournCoin
  redeem(token: String!): JournCoin
}

extend type Article {
  bought: Boolean
  revenues: Int
}

extend type Person {
  expenses: Int
  revenues: Int
}
`;
export default typeDefs;
