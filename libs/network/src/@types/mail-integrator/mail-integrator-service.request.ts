export type GetMailSendersRequest = {
  userId: string;
};

export type GetUnreadMessagesRequest = {
  userId: string;
  type: 'SENDER' | 'GROUP' | 'ALL';
  target?: string;
};

export type GetMessageRequest = {
  userId: string;
  mailId: string;
};

export type ModifyMessageAsReadRequest = {
  userId: string;
  mailId: string;
};

export type ModifyMessageAsUnReadRequest = {
  userId: string;
  mailId: string;
};

export type RemoveMessageRequest = {
  userId: string;
  mailId: string;
};

export type AttachAccessTokenRequest = {
  userId: string;
  accessToken: string;
};
