import { delegateToSchema } from '@graphql-tools/delegate';

export default (subschema) => ({
  Query: {
    hello: () => 'Hello',
    read: (parent, args, context, info) => delegateToSchema({
      schema: subschema,
      operation: 'query',
      fieldName: 'article',
      args: {
        where: { id: args.id },
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
          owner: { connect: { id: context.authorId } },
        },
      },
      context,
      info,
    }),
  },
});
