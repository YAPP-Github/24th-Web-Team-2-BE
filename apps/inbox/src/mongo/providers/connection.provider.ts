import mongoose from 'mongoose';
import { MongoTokens } from '../tokens/mongo.tokens';

export const connectionProvider = {
  provide: MongoTokens.CONNECTION,
  useFactory: async (): Promise<typeof mongoose> => await mongoose.connect(process.env.MONGO_CONNECTION_STRING_DEV),
};
