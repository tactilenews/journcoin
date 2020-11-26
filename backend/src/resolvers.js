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
});
