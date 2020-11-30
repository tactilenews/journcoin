import {
  rule, shield, allow, deny, and,
} from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, context) => !!context.person.id,
);

const isBuyer = rule({ cache: 'strict' })(
  async (article, args, context) => {
    const ownerIds = article.journCoins.map((coin) => coin.owner.id);
    return ownerIds.includes(context.person.id);
  },
);

const permissions = shield({
  Query: {
    '*': deny,
    profile: isAuthenticated,
    articles: allow,
    article: allow,
    people: allow,
    person: allow,
    journCoins: allow,
    articlesConnection: allow,
  },
  Mutation: {
    '*': deny,
    updateArticle: isAuthenticated,
    createJournCoin: isAuthenticated,
    buy: isAuthenticated,
    redeem: isAuthenticated,
  },
  Article: {
    text: and(isAuthenticated, isBuyer),
  },
}, {
  allowExternalErrors: true,
  fallbackRule: allow,
});

export default permissions;
