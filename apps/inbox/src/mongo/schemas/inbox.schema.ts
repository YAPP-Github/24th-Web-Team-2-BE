import { Schema } from 'mongoose';

export const InboxSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    interests: [String],
    subscriptions: [
      {
        _id: false,
        name: { type: String, required: true },
        address: { type: String, required: true },
      },
    ],
    groups: [
      {
        name: { type: String, required: true },
        senders: [
          {
            _id: false,
            name: { type: String, required: true },
            address: { type: String, required: true },
          },
        ],
      },
    ],
    spams: [String],
  },
  {
    timestamps: true,
  },
);
