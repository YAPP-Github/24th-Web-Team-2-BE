export type GetMailSendersResponse = {
  senders: {
    subject: string;
    date: Date;
    snippet: string;
    from: {
      name: string;
      address: string;
    };
    to: {
      name: string;
      address: string;
    };
    mimeType: string;
    payload?: {
      partId: string;
      mimeType: string;
      body: string;
    }[];
    mailId: string;
  }[];
};

export type GetUnreadMessagesResponse = {
  mails: {
    subject: string;
    date: Date;
    snippet: string;
    from: {
      name: string;
      address: string;
    };
    to: {
      name: string;
      address: string;
    };
    mimeType: string;
    payload?: {
      partId: string;
      mimeType: string;
      body: string;
    }[];
    mailId: string;
  }[];
};
