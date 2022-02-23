import { Types } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface TUserModel extends TUser {
  _id: Types.ObjectId;
}

export interface TGetUserArgs{
  offset: number;
  limit: number;
}
