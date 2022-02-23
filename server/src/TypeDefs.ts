import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    name: String!
    id: String!
    email: String!
  }

  type Query {
    greeting: String
  }
`;
