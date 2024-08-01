import { Schema } from 'mongoose';

export const MailSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    provider: {
      messageId: { type: String, required: true },
      source: { type: String, required: true },
    },
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    labels: [String],
    snippet: { type: String, required: true },
    from: {
      address: { type: String, required: true },
      localPart: { type: String, required: true },
      domain: { type: String, required: true },
      name: { type: String, required: true },
    },
    to: { type: String, required: true },
    mimeType: { type: String, required: true },
    payload: [
      {
        partId: { type: Number, required: true },
        mimeType: { type: String, required: true },
        body: { type: String, required: true },
      },
    ],
    categories: [String],
  },
  {
    timestamps: true,
  },
);
