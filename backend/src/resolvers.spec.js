import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import Server from './server';

jest.mock('./graphCms/schema');

let query;
let mutate;
let contextMock;

beforeEach(async () => {
  contextMock = {};
  const server = await new Server(ApolloServer, { context: () => contextMock });
  const testClient = createTestClient(server);
  ({ query, mutate } = testClient);
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

describe('mutations', () => {
  describe('REDEEM', () => {
    const token = 'value does not matter';
    const REDEEM = gql`
      mutation($token: String!) {
        redeem(token: $token) {
          id
          token
        }
      }
    `;
    beforeEach(() => {
      contextMock.jwt = { verify: jest.fn() };
    });

    it('responds with Forbidden error', async () => {
      await expect(mutate({ mutation: REDEEM, variables: { token } }))
        .resolves
        .toMatchObject({
          errors: [expect.objectContaining({ message: 'Not Authorised!', extensions: { code: 'FORBIDDEN' } })],
          data: {
            redeem: null,
          },
        });
    });

    describe('as authenticated user', () => {
      beforeEach(() => {
        contextMock.person = { id: '3' };
      });

      describe('given invalid JWT', () => {
        beforeEach(() => {
          contextMock.jwt = { verify: jest.fn().mockRejectedValue(false) };
        });

        it('responds with UserInputError ', async () => {
          await expect(mutate({ mutation: REDEEM, variables: { token } }))
            .resolves
            .toMatchObject({
              errors: [expect.objectContaining({ message: 'Invalid JournCoin!', extensions: { code: 'BAD_USER_INPUT' } })],
              data: { redeem: null },
            });
        });
      });

      describe('given valid JWT', () => {
        beforeEach(() => {
          contextMock.jwt = { verify: jest.fn().mockResolvedValue(true) };
        });

        it('responds with created JournCoin', async () => {
          await expect(mutate({ mutation: REDEEM, variables: { token } }))
            .resolves
            .toMatchObject({
              data: {
                redeem: { id: expect.any(String), token: 'Hello World' },
              },
            });
        });
      });
    });
  });
});
