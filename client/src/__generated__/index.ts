import { gql } from '@apollo/client';

export interface TUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const GET_ALL_USER_GQL = gql`
  query GetAllUser($page: Int!, $limit: Int!) {
    getAllUser(page: $page, limit: $limit) {
      data {
        id
        name
        email
        createdAt
        updatedAt
      }
      page
      total
    }
  }
`;
