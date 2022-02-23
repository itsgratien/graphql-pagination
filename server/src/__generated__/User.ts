import { Types } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  createAt: string;
  updatedAt: string;
}

export interface TUserModel extends TUser {
  _id: Types.ObjectId;
}
