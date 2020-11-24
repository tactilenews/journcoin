import {
  shield, allow, deny,
} from 'graphql-shield';

const permissions = shield({
  Query: {
    '*': deny,
    hello: allow,
    articles: allow,
    people: allow,
  },
  Mutation: {
    createJournCoin: allow,
    buy: allow,
    '*': deny,
  },
}, {
  fallbackRule: allow,
});

export default permissions;
