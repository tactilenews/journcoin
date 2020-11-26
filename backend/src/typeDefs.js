import { gql } from 'apollo-server';

const typeDefs = gql`
type Query {
  hello: String
  read(slug: String!): Article
  profile: Person
}

type Mutation {
  buy(id: ID!, token: String!): JournCoin
}
`;
export default typeDefs;
