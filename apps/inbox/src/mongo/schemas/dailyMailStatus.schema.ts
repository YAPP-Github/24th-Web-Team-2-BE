import { Schema } from 'mongoose';

export const DailyMailStatusSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    dailyInsights: {
      mails: [String],
      count: Number,
    },
    interests: [
      {
        category: String,
        count: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);
