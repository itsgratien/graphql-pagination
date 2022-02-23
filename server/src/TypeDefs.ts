import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    name: String!
    id: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type GetUserResponse{
    data: [User!]!
  }

  type Query {
    greeting: String
    getAllUser(offset: Int!, limit: Int!): GetUserResponse
  }
`;
