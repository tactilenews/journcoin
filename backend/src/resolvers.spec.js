import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import Server from './server';

jest.mock('./graphCms/schema');

let query;

beforeEach(async () => {
  const server = await new Server(ApolloServer, { context: () => {} });
  const testClient = createTestClient(server);
  query = testClient.query;
});

describe('queries', () => {
  describe('HELLO', () => {
    const HELLO = gql`query { hello }`;

    it('returns string `hello`', async () => {
      await expect(query({ query: HELLO }))
        .resolves
        .toMatchObject({
          errors: undefined,
          data: { hello: 'Hello' },
        });
    });
  });
});
