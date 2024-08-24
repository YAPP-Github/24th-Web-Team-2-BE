export interface GetSubscriptionsResponse {
  subscriptions: {
    name: string;
    address: string;
  }[];
}

export interface GetGroupsResponse {
  groups: {
    groupId: string;
    name: string;
    senders: {
      name: string;
      address: string;
    }[];
  }[];
}

export interface GetSpamsResponse {
  spams: {
    address: string;
  }[];
}

export type GetInboxResponse = {
  inboxId: unknown;
  subscriptions: {
    name: string;
    address: string;
  }[];
  groups: {
    name: string;
    senders: { name: string; address: string }[];
  }[];
  spams: string[];
  interests: [string];
  createdAt: Date;
  updatedAt: Date;
};
