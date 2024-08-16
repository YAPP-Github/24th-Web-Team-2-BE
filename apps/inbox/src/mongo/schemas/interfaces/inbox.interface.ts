import { Document, ObjectId, Types } from 'mongoose';

interface Group extends Document {
  name: string;
  senders: { name: string; address: string }[];
}
export interface Inbox extends Document {
  readonly userId: string;
  readonly interests: [string];
  readonly subscriptions: { name: string; address: string }[];
  readonly groups: Types.DocumentArray<Group>;
  readonly spams: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
