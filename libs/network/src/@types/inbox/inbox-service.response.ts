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
