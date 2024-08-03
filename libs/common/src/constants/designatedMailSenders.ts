export type MailSender = {
  name: string;
  address: string;
  categories: string[];
};

export const designatedMailSenders: MailSender[] = [
  {
    name: '디스콰이엇 권도언',
    address: 'stevekwon@disquiet.io',
    categories: ['IT/테크', '트렌드', '스타트업'],
  },
  {
    name: '요즘IT',
    address: 'yozm_help@wishket.com',
    categories: ['IT/테크', '디자인', '트렌드', '스타트업'],
  },
  {
    name: '팩플 Weekly',
    address: 'factpl@joongang.co.kr',
    categories: ['IT/테크', '경제/시사', '트렌드'],
  },
  {
    name: '팁스터',
    address: 'tipster@maily.so',
    categories: ['IT/테크'],
  },
  {
    name: 'Pinterest',
    address: 'recommendations@discover.pinterest.com',
    categories: ['디자인'],
  },
  {
    name: 'Design Compass',
    address: 'contact@designcompass.org',
    categories: ['디자인', '트렌드', '스타트업'],
  },
  {
    name: '디그(dig)',
    address: 'dig@mk.co.kr',
    categories: ['경제/시사'],
  },
  {
    name: 'ROA 뉴스레터',
    address: 'roanewsletter-noreply@roa.ai',
    categories: ['IT/테크', '경제/시사'],
  },
  {
    name: 'NEWNEEK',
    address: 'whatsup@newneek.co',
    categories: ['경제/시사'],
  },
  {
    name: '미라클레터',
    address: 'miraklelab@mk.co.kr',
    categories: ['IT/테크', '경제/시사', '트렌드'],
  },
  {
    name: '캐릿(Careet)',
    address: 'careet@careet.net',
    categories: ['트렌드'],
  },
  {
    name: '일일일',
    address: 'official@oneoneone.kr',
    categories: ['IT/테크', '디자인', '트렌드', '커리어', '스타트업'],
  },
  {
    name: '서핏 SURFSIDE',
    address: 'surfside@surfit.io',
    categories: ['IT/테크', '디자인', '트렌드', '커리어', '스타트업'],
  },
  {
    name: 'LinkedIn 채용공고 알림',
    address: 'jobalerts-noreply@linkedin.com',
    categories: ['커리어'],
  },
  {
    name: '원티드 추천 포지션',
    address: 'recommend-noreply@mail.wantedlab.com',
    categories: ['커리어'],
  },
  {
    name: 'EO planet',
    address: 'yoonhye2345@gmail.com',
    categories: ['IT/테크', '트렌드', '커리어', '스타트업'],
  },
];
