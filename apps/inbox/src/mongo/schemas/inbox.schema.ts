import { Schema } from 'mongoose';

export const InboxSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    interests: [String],
    subscriptions: [String],
    spams: [String],
  },
  {
    timestamps: true,
  },
);
