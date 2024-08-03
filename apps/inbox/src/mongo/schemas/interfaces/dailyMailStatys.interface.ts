import { Schema } from 'mongoose';

export interface DailyMailStatus extends Document {
  readonly userId: string;
  readonly dailyInsights: {
    mails: [string];
    count: number;
  };
  readonly interests: [
    {
      category: string;
      count: number;
    },
  ];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
