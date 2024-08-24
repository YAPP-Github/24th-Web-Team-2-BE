interface Newsletter {
  name: string;
  companyName: string;
  isAutomated: boolean;
  content: string;
  link: string;
}

export interface SubscriptionList {
  tech: Newsletter[];
  business: Newsletter[];
  health: Newsletter[];
  trend: Newsletter[];
  career: Newsletter[];
  startup: Newsletter[];
}

const techNewsletterList: Newsletter[] = [];

const businessNewsletterList: Newsletter[] = [];

const designNewsletterList: Newsletter[] = [];

const trendNewsletterList: Newsletter[] = [];

const careerNewsletterList: Newsletter[] = [];

const startupNewsletterList: Newsletter[] = [];

export const subscriptionNewsletterList: SubscriptionList = {
  tech: techNewsletterList,
  business: businessNewsletterList,
  health: designNewsletterList,
  trend: trendNewsletterList,
  career: careerNewsletterList,
  startup: startupNewsletterList,
};
