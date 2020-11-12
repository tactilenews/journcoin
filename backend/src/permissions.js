import {
  shield, allow, deny,
} from 'graphql-shield';

const permissions = shield({
  Query: {
    '*': deny,
    hello: allow,
    articles: allow,
  },
  Mutation: {
    '*': deny,
  },
}, {
  fallbackRule: allow,
});

export default permissions;
