import { UserInputError, ForbiddenError } from 'apollo-server';

import {
  rule, shield, allow, deny, and,
} from 'graphql-shield';

import { JWT_SECRET } from './config';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, context) => !!context.person.id,
);

const isBuyer = rule({ cache: 'strict' })(
  async (article, args, context) => {
    const ownerIds = article.journCoins.map((coin) => coin.owner.id);
    return ownerIds.includes(context.person.id);
  },
);

const isValidJournCoin = rule({ cache: 'strict' })(
  async (parent, args, context) => {
    try {
      await context.jwt.verify(args.token, JWT_SECRET);
      return true;
    } catch (e) {
      return new UserInputError('Invalid JournCoin!');
    }
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
    redeem: and(isAuthenticated, isValidJournCoin),
  },
  Article: {
    text: and(isAuthenticated, isBuyer),
  },
}, {
  allowExternalErrors: true,
  fallbackRule: allow,
  fallbackError: new ForbiddenError('Not Authorised!'),
});

export default permissions;
