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

export interface TGetAllUserResponse {
  getAllUser: {
    data: TUser[];
    page?: number;
    total?: number;
  };
}

export interface TGetAllUserVariable{
  page: number;
  limit: number;
}