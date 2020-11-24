import { gql } from 'apollo-server';

const typeDefs = gql`
type Query {
  hello: String
}

type Mutation {
  buy(id: ID!, token: String!): JournCoin
}
`;
export default typeDefs;
