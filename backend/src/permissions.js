import {
  rule, shield, allow, deny,
} from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, context) => !!context.authorId,
);

const permissions = shield({
  Query: {
    '*': deny,
    hello: allow,
    articles: allow,
    people: allow,
  },
  Mutation: {
    buy: isAuthenticated,
    '*': deny,
  },
}, {
  fallbackRule: allow,
});

export default permissions;
