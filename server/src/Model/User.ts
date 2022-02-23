import mongoose from 'mongoose';
import { TUserModel } from '~src/__generated__';

const userSchema = new mongoose.Schema<TUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<TUserModel>('User', userSchema);
