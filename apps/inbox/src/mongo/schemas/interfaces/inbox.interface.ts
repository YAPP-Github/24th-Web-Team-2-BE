import { Document } from 'mongoose';

export interface Inbox extends Document {
  readonly userId: string;
  readonly interests: [string];
  readonly subscriptions: [string];
  readonly spams: [string];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
