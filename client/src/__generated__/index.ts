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

export const FETCH_MORE_USER_GQL = gql`
  query FetchMoreUser($page: Int!, $limit: Int!) {
    fetchMoreUser(page: $page, limit: $limit) {
      data {
        id
        name
        email
        createdAt
        updatedAt
      }
      page
      total
      offset
    }
  }
`;

export const LOAD_USER_INFINITE_GQL = gql`
  query LoadUsersInfinite($page: Int!, $limit: Int!) {
    loadUsersInfinitely(page: $page, limit: $limit) {
      data {
        id
        name
        email
        createdAt
        updatedAt
      }
      page
      total
      offset
    }
  }
`;

export interface TGetAllUser {
  data: TUser[];
  page?: number;
  total?: number;
  offset: number;
}
export interface TGetAllUserResponse {
  getAllUser: TGetAllUser;
}

export interface TGetAllUserVariable {
  page: number;
  limit: number;
}

export interface TFetchMoreResponse {
  fetchMoreUser: TGetAllUser;
}

export interface TLoadUsersInfinitelyResponse {
  loadUsersInfinitely: TGetAllUser;
}
