import {
  rule, shield, allow, deny, and,
} from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, context) => !!context.authorId,
);

const isBuyer = rule({ cache: 'strict' })(
  async (article, args, context) => {
    const ownerIds = article.journCoins.map((coin) => coin.owner.id);
    return ownerIds.includes(context.authorId);
  },
);

const permissions = shield({
  Query: {
    '*': deny,
    read: allow,
    hello: allow,
    articles: allow,
    article: allow,
    people: allow,
    person: allow,
  },
  Mutation: {
    '*': deny,
    buy: isAuthenticated,
  },
  Article: {
    text: and(isAuthenticated, isBuyer),
  },
}, {
  fallbackRule: allow,
});

export default permissions;
