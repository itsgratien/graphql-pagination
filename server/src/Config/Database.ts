import mongoose from 'mongoose';
import { userModel } from '~src/Model';
import { users } from '.';

export const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gqlpagination');
    return undefined;
  } catch (error) {
    throw error;
  }
};

export const addUsers = async () => {
  try {
    await userModel.create(users);
    return undefined;
  } catch (error) {
    throw error;
  }
};
