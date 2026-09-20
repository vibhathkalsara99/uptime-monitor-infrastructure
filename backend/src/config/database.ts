import mongoose from 'mongoose';

const getMongoUri = (): string => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is required to start the backend.');
  }

  return mongoUri;
};

export const connectDatabase = async (): Promise<void> => {
  if (Number(mongoose.connection.readyState) === 1) {
    return;
  }

  await mongoose.connect(getMongoUri());
};
