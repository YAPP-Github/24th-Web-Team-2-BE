export interface Mail extends Document {
  readonly userId: string;
  readonly provider: {
    messageId: string;
    source: string;
  };
  readonly subject: string;
  readonly date: Date;
  readonly labels: [string];
  readonly snippet: string;
  readonly from: {
    address: string;
    localPart: string;
    domain: string;
    name: string;
  };
  readonly to: string;
  readonly mimeType: string;
  readonly payload: [
    {
      partId: number;
      mimeType: string;
      body: string;
    },
  ];
  readonly categories: [string];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
