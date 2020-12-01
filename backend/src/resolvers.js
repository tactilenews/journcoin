import { delegateToSchema } from '@graphql-tools/delegate';
import { UserInputError, gql } from 'apollo-server';

const BEFORE_BUY_CHECKS = gql`
query($article: ArticleWhereInput!, $id: ID!) {
  journCoins(
    stage: DRAFT
    locales: en
    where: { article: null, owner: { id: $id } }
    first: 1
  ) {
    id
  }
  articlesConnection(
    stage: DRAFT
    locales: en
    where: { AND: [$article, { journCoins_some: { owner: { id: $id } } }] }
  ) {
    aggregate {
      count
    }
  }
}
`;

export default ({ subschema, executor }) => ({
  Query: {
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

  },
  Mutation: {
    buy: async (parent, args, context, info) => {
      const { data: { journCoins, articlesConnection } } = await executor({
        document: BEFORE_BUY_CHECKS,
        variables: { article: args.article, id: context.person.id },
      });
      const { aggregate: { count } } = articlesConnection;
      if (count > 0) throw new UserInputError('You already bought this article!');
      const [availableCoin] = journCoins;
      if (!availableCoin) throw new UserInputError('You have run out of JournCoins!');

      return delegateToSchema({
        schema: subschema,
        operation: 'mutation',
        fieldName: 'updateJournCoin',
        args: {
          where: { ...availableCoin },
          data: { article: { connect: args.article } },
        },
        context,
        info,
      });
    },
    redeem: (parent, args, context, info) => delegateToSchema({
      schema: subschema,
      operation: 'mutation',
      fieldName: 'createJournCoin',
      args: {
        data: {
          token: args.token,
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
      resolve: (person) => {
        const articles = person
          .journCoins.map((coin) => coin.article)
          .filter((article) => article);
        return new Set(articles.map((article) => article.id)).size;
      },
    },
  },
});
