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
  describe('PEOPLE', () => {
    const PEOPLE = gql`
      {
        people(stage: DRAFT, locales: en) {
          id
          name
        }
      }
    `;

    it('returns array of `Person`', async () => {
      await expect(query({ query: PEOPLE }))
        .resolves
        .toMatchObject({
          errors: undefined,
          data: {
            people: [
              { id: expect.any(String), name: 'Hello World' },
              { id: expect.any(String), name: 'Hello World' },
            ],
          },
        });
    });
  });
});
