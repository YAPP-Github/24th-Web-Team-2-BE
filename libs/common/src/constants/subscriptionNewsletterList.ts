interface Newsletter {
  name: string;
  companyName: string;
  isAutomated: boolean;
  content: string;
  subscriptionLink: string;
  contentLink: string;
}

export interface SubscriptionList {
  tech: Newsletter[];
  business: Newsletter[];
  design: Newsletter[];
  trend: Newsletter[];
  career: Newsletter[];
  startup: Newsletter[];
}

const techNewsletterList: Newsletter[] = [
  {
    name: 'FE News',
    companyName: 'FE News',
    isAutomated: false,
    content:
      '네이버 FE 엔지니어들이 엄선한 양질의 FE 및 주요한 기술 소식들을 큐레이션 해 공유하는 것을 목표로 합니다. 매월 첫째 주 수요일, 월 1회 발행 됩니다.',
    subscriptionLink: 'https://fenews.substack.com/embed',
    contentLink: 'https://github.com/naver/fe-news/blob/master/issues/2024-08.md',
  },
];

const businessNewsletterList: Newsletter[] = [
  {
    name: '머니레터',
    companyName: '어피티',
    isAutomated: false,
    content: '경제 공부, 선택 아닌 필수막막한 경제 공부, 머니레터로 시작하세요.',
    subscriptionLink: 'https://uppity.co.kr/newsletter/money-letter/',
    contentLink: 'https://uppity.co.kr/newsletter/money-letter/',
  },
];

const designNewsletterList: Newsletter[] = [
  {
    name: '디자인 나침반 뉴스레터',
    companyName: '디자인 나침반',
    isAutomated: false,
    content: ' 매주 화요일 아침, 16년 차 디자이너가큐레이션한 디자인 트렌드를 모아보세요.',
    subscriptionLink: 'https://designcompass.org/',
    contentLink: 'https://designcompass.org/',
  },
];

const trendNewsletterList: Newsletter[] = [
  {
    name: '캐릿',
    companyName: '대학내일',
    isAutomated: false,
    content: 'MZ세대와 세 발 더 가까워질 수 있는 인사이트를 매주 화요일 출근 전에 쏴드립니다. 렛츠 캐릿!',
    subscriptionLink: 'https://www.careet.net/Subscribe',
    contentLink: 'https://universitytomorrow.com/',
  },
];

const careerNewsletterList: Newsletter[] = [
  {
    name: '서핏',
    companyName: '서핏',
    isAutomated: false,
    content: '스타트업 사람들을 위한 뉴스레터',
    subscriptionLink: 'https://surfside.stibee.com/',
    contentLink: 'https://surfside.stibee.com/',
  },
];

const startupNewsletterList: Newsletter[] = [
  {
    name: '조쉬의 프로덕트 레터',
    companyName: '조쉬의 프로덕트 레터',
    isAutomated: false,
    content: '퀄리티 있는 비즈니스, 프로덕트, 디자인, 1인 창업가 이야기를 주 1회 들려드릴게요.',
    subscriptionLink: 'https://maily.so/josh',
    contentLink: 'https://maily.so/josh',
  },
];

export const subscriptionNewsletterList: SubscriptionList = {
  tech: techNewsletterList,
  business: businessNewsletterList,
  design: designNewsletterList,
  trend: trendNewsletterList,
  career: careerNewsletterList,
  startup: startupNewsletterList,
};
