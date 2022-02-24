import { ApolloError } from 'apollo-server-express';
import { userModel } from '~src/Model';
import { TGetUserArgs } from '~src/__generated__';

export const greeting = () => 'hello world';

const getUsersFunc = async (args: TGetUserArgs) => {
  const { page, limit } = args;
  const count = await userModel.count();

  const offset = page > 0 ? (page - 1) * limit : 0;

  const getUsers = await userModel.find({}).limit(limit).skip(offset);

  return {
    data: getUsers.map((item) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })),
    page,
    total: count,
    offset,
  };
};

export const getAllUser = async (_root: any, args: TGetUserArgs) => {
  try {
    return getUsersFunc(args);
  } catch (error: any) {
    return new ApolloError(
      `Unable to fetch data due to internal server error. ${error.message}`
    );
  }
};

export const fetchMoreUser = async (_root: any, args: TGetUserArgs) => {
  try {
    return getUsersFunc(args);
  } catch (error: any) {
    return new ApolloError(
      `Unable to fetch data due to internal server error. ${error.message}`
    );
  }
};

export const loadUsersInfinitely = async (_root: any, args: TGetUserArgs) => {
  try {
    return getUsersFunc(args);
  } catch (error: any) {
    return new ApolloError(
      `Unable to fetch data due to internal server error. ${error.message}`
    );
  }
};
