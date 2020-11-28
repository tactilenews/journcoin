import { delegateToSchema } from '@graphql-tools/delegate';

export default (subschema) => ({
  Query: {
    hello: () => 'Hello',
    profile: (parent, args, context, info) => delegateToSchema({
      schema: subschema,
      operation: 'query',
      fieldName: 'person',
      args: {
        where: { id: context.person.id },
      },
      context,
      info,
    }),
    read: (parent, args, context, info) => delegateToSchema({
      schema: subschema,
      operation: 'query',
      fieldName: 'article',
      args: {
        where: { slug: args.slug },
      },
      context,
      info,
    }),
  },
  Mutation: {
    buy: (parent, args, context, info) => delegateToSchema({
      schema: subschema,
      operation: 'mutation',
      fieldName: 'createJournCoin',
      args: {
        data: {
          token: args.token,
          article: { connect: { id: args.id } },
          owner: { connect: { id: context.person.id } },
        },
      },
      context,
      info,
    }),
  },
  Article: {
    bought: {
      selectionSet: '{ journCoins { owner { id } } }',
      resolve: (article, args, context) => {
        const ownerIds = article.journCoins.map((coin) => coin.owner.id);
        return ownerIds.includes(context.person.id);
      },
    },
    text: {
      selectionSet: '{ journCoins { owner { id } } }',
    },
    revenues: {
      selectionSet: '{ journCoins { token } }',
      resolve: (article) => article.journCoins.length,
    },
  },
  Person: {
    revenues: {
      selectionSet: '{ articles { journCoins { token } } }',
      resolve: (person) => person.articles.reduce((a, b) => a + b.journCoins.length, 0),
    },
    expenses: {
      selectionSet: '{ journCoins { article { id } } }',
      resolve: (person) => new Set(person.journCoins.map((coin) => coin.article.id)).size,
    },
  },
});
