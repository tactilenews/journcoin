import { delegateToSchema } from '@graphql-tools/delegate';

const userId = 'ckhv9ba5c153m0a56nc6fqkay';

export default (subschema) => ({
  Query: {
    hello: () => 'Hello',
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
          owner: { connect: { id: userId } },
        },
      },
      context,
      info,
    }),
  },
});
