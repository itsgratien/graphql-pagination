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
    page: Int
    total: Int
    offset: Int
  }

  type Query {
    greeting: String
    getAllUser(page: Int!, limit: Int!): GetUserResponse
    fetchMoreUser(page: Int!, limit: Int!): GetUserResponse
  }
`;
