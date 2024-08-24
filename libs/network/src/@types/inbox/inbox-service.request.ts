export interface CreateInboxRequest {
  userId: string;
}

export interface AddSubscriptionRequest {
  userId: string;
  subscriptions: { name: string; address: string }[];
}

export interface AddGroupRequest {
  userId: string;
  groupName: string;
}

export interface AddSenderToGroupRequest {
  userId: string;
  groupName: string;
  sender: { name: string; address: string };
}

export interface AddSpamRequest {
  userId: string;
  spams: string[];
}

export interface AddInterestRequest {
  userId: string;
  interests: string[];
}

export interface GetSubscriptionsRequest {
  userId: string;
}

export interface GetGroupsRequest {
  userId: string;
}

export interface GetSpamsRequest {
  userId: string;
}

export type GetInboxRequest = {
  userId: string;
};
