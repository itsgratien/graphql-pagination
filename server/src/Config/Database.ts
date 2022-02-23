import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gqlpagination');
    return undefined;
  } catch (error) {
    throw error;
  }
};
