interface Newsletter {
  name: string;
  address: string;
  companyName: string;
  isAutomated: boolean;
  content: string;
  thumbnailImage: string;
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
    name: 'Naver FE News',
    companyName: 'Naver FE News',
    isAutomated: false,
    content:
      '네이버 FE 엔지니어들이 엄선한 양질의 FE 및 주요한 기술 소식들을 큐레이션 해 공유하는 것을 목표로 합니다. 매월 첫째 주 수요일, 월 1회 발행 됩니다.',
    thumbnailImage:
      'https://substackcdn.com/image/fetch/w_170,c_limit,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a361db4-9ede-4d1a-baf0-c7357acd4e4c_479x479.png',
    subscriptionLink: 'https://fenews.substack.com/embed',
    contentLink: 'https://github.com/naver/fe-news/blob/master/issues/2024-08.md',
    address: '@substack.com',
  },
  {
    name: '요즘 IT',
    companyName: '위시캣',
    isAutomated: false,
    content: '일주일에 한 번, 전문가들의 IT 이야기를 전해드려요',
    thumbnailImage: 'https://yozm.wishket.com/static/renewal/img/news/og-img-main.png',
    subscriptionLink: 'https://yozm.wishket.com/magazine/',
    contentLink: 'https://yozm.wishket.com/magazine/',
    address: '@wishket.com',
  },
  {
    name: '뭐지 뉴스레터',
    companyName: '뭐지',
    isAutomated: false,
    content: '주간 IT 소식을 요약해 매주 수요일에 여러분의 메일함으로 찾아가는 뉴스레터!',
    thumbnailImage: 'https://moji.or.kr/new_logo_text.svg',
    subscriptionLink: 'https://moji.or.kr/',
    contentLink: 'https://moji.or.kr/archive/',
    address: '@moji.or.kr',
  },
  {
    name: 'GeekNews',
    companyName: 'GeekNews',
    isAutomated: false,
    content: '일주일간의 GeekNews 중 엄선한 소식들을 보내드려요',
    thumbnailImage:
      'https://app.heybunny.io/_next/image?url=https%3A%2F%2Fassets.heybunny.io%2Fnewsletter%2Fweb%2Fgeeknews.png&w=3840&q=75',
    subscriptionLink: 'https://news.hada.io/weekly',
    contentLink: 'https://news.hada.io/weekly',
    address: '@hada.io',
  },
  {
    name: '팁스터',
    companyName: '팁스터',
    isAutomated: false,
    content: '앱/웹 서비스를 구성하는 요소들에 대한 편집자의 생각과 노하우, 함께 활용하기 좋은 서비스를 정리하여 보내드려요',
    thumbnailImage: 'https://cdn.maily.so/mailydfd3985cf89c8dd5ed873917477ed7c61627967836',
    subscriptionLink: 'https://maily.so/tipster?pop=up',
    contentLink: 'https://maily.so/tipster?pop=up',
    address: '@maily.so',
  },
  {
    name: '일분톡',
    companyName: '일분톡',
    isAutomated: false,
    content: '출퇴근길 1분이면 충분한, 세상 쉬운 테크 이야기를 전해요',
    thumbnailImage: 'https://t1.daumcdn.net/news/202311/06/ilbuntok/20231106110238888fodm.png',
    subscriptionLink: 'https://ilbuntok.com/',
    contentLink: 'https://page.stibee.com/archives/328756',
    address: '@ilbuntok.com',
  },
  {
    name: '죠스레터',
    companyName: '죠스레터',
    isAutomated: false,
    content: '테크 업계의 다양한 이야기를 보내드려요',
    thumbnailImage: 'https://www.jawsletter.blog/content/images/size/w256h256/2024/03/character2.png',
    subscriptionLink: 'https://www.jawsletter.blog/subscribe/',
    contentLink: 'https://www.jawsletter.blog/',
    address: '@jawsletter.blog',
  },
];

const businessNewsletterList: Newsletter[] = [
  {
    name: '어피티',
    companyName: '머니레터',
    isAutomated: false,
    content: '막막한 경제 공부, 머니레터로 시작하세요',
    thumbnailImage:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAACUCAMAAABBVf7OAAAAbFBMVEX/IiL/////AAD/qan/0dH/9vb/bm7/Hh7/YWH/4uL/enr/Cwv/LCz/3Nz/ZGT//Pz/ior/R0f/GBj/w8P/7+//PDz/nZ3/k5P/y8v/XFz/hob/1tb/QkL/NDT/WFj/uLj/UVH/r6//gID/o6P43nXFAAAECElEQVR4nO3c23KqMBSAYViCgOEgIRwUELHv/44bULuT4ITOnu6xK13/RVudXvgNB0MMOg5FURRFURRFURRFURRFURRF/c84bPTuF/hd8W5n7mgLFUbXnMj5u1/j9wTehtQP2btf4/cEDUlJijWS2i1NEnH/I2qF3dLLtVp+i30+2C29Qblsy4qD5dtUgPMx206wt+A4ZfoAvpXOPnsIfdcdYojwS/m19ZSiTJJG0A9udoCTBedeeWuty1I4uEWpbGe00sQkdRMom3rZhW2X+ilcrupgwlKpWwCHk5CfsVUanRiM8knKWmk2Qq7+i63SafdN1dOzBdKorj4rrJaOwDkPnGD6CTerpQX0fe9wZ/oZ1xZIAzX9OK2nQZEVx2kQxGqBr8Jq2CvvKW4THDBKg+CYqGnQtdT19ccopLxsXXNrqR5Jf1YkJelLafpbpFmJ4VPFf5G2R6Uaxc6rSofnk1fPII0u2twhCqgmZU48DenjIG9M0hMOmpYiFU3hlXDwCs+3QMqZEpTagD6HauM4RSLlXapWa+PclbSpB4xSXo6RmlBda+kqHFIWGmforZJuzYeRlKQ/NZKapJmv1nQYBvSK1E/aqUT5JHgtzXYHtRzDJlWlXrwM0C+jb5J6nTagx7BFdWnJLqdTCVA9qCKJRAfHaTwh2T2ca1o1KSRJ4p2Zc79Iy8ZLmDqsTMNwwCfVF6KcIkU6/4pS+FgO1awCxnjAGbARnRQu2ulEHq1P0vlRVsPZf+y9zwQ2Kb8m2luEfJ79Kz3qE/fyf6GQsr1+qaIY7ntv28FgmBOzRDoURe1AZ7rAsUMaLBNevXEBrx3S+f00PJsHiHZIQfhiY9oapTSbU6UvZEKbfqn64N2ML6RIk9sy4z74knS9QcUhVGbUwh7DJlWlw32UFH8+91LqgTpNyjBsUU1aQFx9VCl8Lrd+KW1QXJOt0qTdfKDWwXMFb9MjluoDel06H4gX2N2fiPb5CopFyva1+omfPPh5SN3QOFOEQ8pebKOVNMqNN5TikMq3dryUCiGim3yri63SeJ7vAvM0px3SZUCfV8bxnx3SfjeOg2ce6Noh7bZG8yil/vO2ySTJTFKhLZDco5Me2WOVdVAWBmmiL3rlKMa5svT8XIAMgUk6nabU3m34Wq+ljln67hf9T21Jr79EKsZiBbVT+jKS/vBISlKS/vx+p7R+PPAhlhZgZ5H6DQYejnnrVbJ0GhEtwh3069ltbAtRVilXbTGERdvuGJylTbrDubOuUq7Ehx5gnv5Nhe3SrDhfujyt5ClfO6XzajnPUz/Xt1W6jqToIilJ8bYtHS2RsuuG1K8skTpQmb9TuEJxT+yX2vqeaGugFEVRFEVRFEVRFEVRFEVR1Pv7Az9ZWog4v77uAAAAAElFTkSuQmCC',
    subscriptionLink: 'https://uppity.co.kr/newsletter/money-letter/',
    contentLink: 'https://uppity.co.kr/newsletter/money-letter/',
    address: '@uppity.co.kr',
  },
  {
    name: '뉴닉 데일리',
    companyName: '뉴닉',
    isAutomated: false,
    content: '바빠도 놓칠 수 없는 세상 소식, 뉴닉이 쉽고 재밌고 다정하게 풀어드려요',
    thumbnailImage:
      'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/cnB6/image/IhsF3EupicqXfXqXn4YmNPBgeIk.png',
    subscriptionLink: 'https://page.stibee.com/subscriptions/26847',
    contentLink: 'https://page.stibee.com/archives/26847',
    address: '@stibee.com',
  },
  {
    name: '부딩',
    companyName: '부딩',
    isAutomated: false,
    content: '부.알.못 밀레니얼을 위해 부동산 정보를 쉽게 알려줘요',
    thumbnailImage:
      'https://static.wixstatic.com/media/6cb3fa_7a010a4bed4847cf942d1fadeeb58cda~mv2.jpg/v1/fill/w_640,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6cb3fa_7a010a4bed4847cf942d1fadeeb58cda~mv2.jpg',
    subscriptionLink: 'https://www.booding.co/',
    contentLink: 'https://www.booding.co/',
    address: '@booding.co',
  },
  {
    name: '미스터동',
    companyName: '미스터동',
    isAutomated: false,
    content: '국내외 17개 일간지에서 종합한 기사 주제와 관점을 10~15분 안에 읽을 수 있도록 전해드려요',
    thumbnailImage: 'https://app.heybunny.io/_next/image?url=https%3A%2F%2Fimages.heybunny.io%2Flarge%2F1706862212397-new.png&w=3840&q=75',
    subscriptionLink: 'https://mrdongnews.com/onboarding',
    contentLink: 'https://mrdongnews.com/',
    address: '@mrdongnews.com',
  },
  {
    name: '순살브리핑',
    companyName: '순살브리핑',
    isAutomated: false,
    content: '전 세계 금융·경제 뉴스 중 살코기만 발라드려요',
    thumbnailImage: 'https://yt3.googleusercontent.com/ytc/AIdro_lMar43mGyvDkwpYrlBmk9iqVrKDX1uKxwWCzB1IHyew2k=s900-c-k-c0x00ffffff-no-rj',
    subscriptionLink: 'https://page.stibee.com/subscriptions/51845?name=%EC%9E%84%EC%B1%84%ED%98%84&email=news.jdustar122%40heybunny.io',
    contentLink: 'https://soonsal.com/',
    address: '@soonsal.com',
  },
  {
    name: '디그',
    companyName: '디그',
    isAutomated: false,
    content: '월수금 아침 5분, 핵심을 파고드는 경제 뉴스를 정성껏 만들어 보내드려요',
    thumbnailImage: 'https://s3.ap-northeast-2.amazonaws.com/img.stibee.com/a82ab710-ca85-4f2e-bda8-3c7abcbad46a.png',
    subscriptionLink: 'https://page.stibee.com/subscriptions/159161?name=%EC%9E%84%EC%B1%84%ED%98%84&email=news.jdustar122%40heybunny.io',
    contentLink: 'https://page.stibee.com/archives/159161',
    address: '@stibee.com',
  },
  {
    name: '너겟레터',
    companyName: '너겟',
    isAutomated: false,
    content: '세상의 돈이 움직이는 이야기 수만 가지 중 사회초년생에게 꼭 필요하고 유익한 소식만 쉽고 재밌게 큐레이션해드려요',
    thumbnailImage: 'https://img.stibee.com/b49d7b21-1aad-4e17-ba8d-05fe317d162f.jpg',
    subscriptionLink: 'https://page.stibee.com/subscriptions/132031?name=%EC%9E%84%EC%B1%84%ED%98%84&email=news.jdustar122%40heybunny.io',
    contentLink: 'https://nugget.im/',
    address: '@nugget.im',
  },
  {
    name: '커피팟',
    companyName: '커피팟',
    isAutomated: false,
    content: '각 분야 현업의 전문가들이 깊이 있는 분석과 새로운 시선을 전해드려요',
    thumbnailImage: 'https://cdn.imweb.me/upload/S20191122814e60292f7a5/71c918a03846e.png',
    subscriptionLink: 'https://page.stibee.com/subscriptions/52057',
    contentLink: 'https://coffeepot.me/',
    address: '@coffeepot.me',
  },
];

const designNewsletterList: Newsletter[] = [
  {
    name: '디자인 나침반 뉴스레터',
    companyName: '디자인 나침반',
    isAutomated: false,
    content: '매주 화요일 아침, 16년 차 디자이너가큐레이션한 디자인 트렌드를 모아보세요.',
    thumbnailImage: 'https://cdn.maily.so/202309/1694438416739802.png',
    subscriptionLink:
      'https://app.heybunny.io/_next/image?url=https%3A%2F%2Fassets.heybunny.io%2Fnewsletter%2Fweb%2Fdesign_compass.png&w=3840&q=75',
    contentLink: 'https://designcompass.org/',
    address: '@designcompass.org',
  },
  {
    name: 'MSV 임팩트레터',
    companyName: 'MSV 임팩트레터',
    isAutomated: false,
    content: '디자인의 사회적 가치와 함께 핵심적으로 다루고 있는 주제의 흥미로운 인사이트를 전해드려요',
    thumbnailImage: 'https://cdn.imweb.me/thumbnail/20230327/142a114118c84.png',
    subscriptionLink: 'https://www.magazinemsv.com/newsletter',
    contentLink: 'https://www.magazinemsv.com/Letter',
    address: '@magazinemsv.com',
  },
  {
    name: '텔유어월드',
    companyName: '텔유어월드',
    isAutomated: false,
    content: '무심코 지나쳤던 일상 속 디자인부터 세상의 모든 브랜드 이야기, 한주동안 가장 핫했던 소식들까지 전해드려요',
    thumbnailImage: 'https://img.stibee.com/ce6709c2-26cd-4388-bcfc-80fa1c267b4a.jpg',
    subscriptionLink: 'https://tellyourworld.stibee.com/',
    contentLink: 'https://tellyourworld.stibee.com/',
    address: '@stibee.com',
  },
  {
    name: '아트레터',
    companyName: 'ARTLAMP',
    isAutomated: false,
    content: '일상에서 예술을 통해 영감을 얻을 수 있도록, 울림을 주는 4-5개 작품을 소개해드려요',
    thumbnailImage: 'https://cdn.imweb.me/thumbnail/20240825/9a391319747ef.png',
    subscriptionLink: 'https://artlamp.org/artletter',
    contentLink: 'https://artlamp.org/artletter',
    address: '@artlamp.org',
  },
  {
    name: 'from.designer',
    companyName: 'from.designer',
    isAutomated: false,
    content: ' 일주일 동안 가장 인기 있었던 해외 UX/UI 아티클을 소개해드려요',
    thumbnailImage: 'https://cdn.maily.so/maily96b1a25984762d02e6b644e5b3ebf3321617349721',
    subscriptionLink: 'https://maily.so/from.designer',
    contentLink: 'https://maily.so/from.designer',
    address: '@maily.so',
  },
];

const trendNewsletterList: Newsletter[] = [
  {
    name: '캐릿',
    companyName: '대학내일',
    isAutomated: false,
    content: '지금 꼭 알아야 하는 트렌드. 캐릿이 모두 정리해 드려요',
    thumbnailImage: 'https://img.stibee.com/66918_1676014333.png',
    subscriptionLink: 'https://www.careet.net/Subscribe',
    contentLink: 'https://universitytomorrow.com/',
    address: '@careet.net',
  },
  {
    name: '은하맨숀',
    companyName: '은하맨숀',
    isAutomated: false,
    content:
      '좋은 물건, 좋은 콘텐츠 등등 찾고 싶은데 그러기엔 시간이 없고, 귀찮으니까 관리소장이 소식지로 만들어서 우편함에 쏘옥 넣어드려요',
    thumbnailImage: 'https://cdn.maily.so/202405/1714788595415344.png',
    subscriptionLink: 'https://maily.so/eunhamansion',
    contentLink: 'https://maily.so/eunhamansion',
    address: '@maily.so',
  },
  {
    name: '미라클레터',
    companyName: '매일경제',
    isAutomated: false,
    content: '글로벌 트렌드, 테크 소식, 빅테크 주식, HR·리더십, 혁신 문화 스토리 등을 인사이트 있게 담아 보내드려요',
    thumbnailImage: 'https://wimg.mk.co.kr/svc/newsletter/product/202311/02/a5f311db-0b6a-41ef-805c-71582823396f.jpg',
    subscriptionLink: 'https://page.stibee.com/subscriptions/33271',
    contentLink: 'https://m.mk.co.kr/newsletter/past/7',
    address: '@mk.co.kr',
  },
  {
    name: '어거스트',
    companyName: '어거스트',
    isAutomated: false,
    content: '미디어 산업에 대한 최신 인사이트를 전해드려요',
    thumbnailImage: 'https://s3.ap-northeast-2.amazonaws.com/img.stibee.com/ec66e8cd-0ed0-4e1a-b60e-80697b8e03b3.png',
    subscriptionLink: 'https://august.stibee.com/subscribe/',
    contentLink: 'https://august.stibee.com/',
    address: '@stibee.com',
  },
  {
    name: '트렌드 라이트',
    companyName: '트렌드 라이트',
    isAutomated: false,
    content: '국내 최대 규모의 커머스 버티컬 뉴스레터로, "사고 파는 모든 것"에 대한 이야기를 다루어요',
    thumbnailImage:
      'https://media.licdn.com/dms/image/D4E16AQF2_AtqtMnD9w/profile-displaybackgroundimage-shrink_200_800/0/1665629374336?e=2147483647&v=beta&t=5hTYVGo_0eUx_VFGlPSbwlauLyw-DfoFyg-5J-t-lg8',
    subscriptionLink: 'https://page.stibee.com/subscriptions/41037?name=%EC%9E%84%EC%B1%84%ED%98%84&email=news.jdustar122%40heybunny.io',
    contentLink: 'https://trendlite.stibee.com/',
    address: '@stibee.com',
  },
];

const careerNewsletterList: Newsletter[] = [
  {
    name: '서핏',
    companyName: '서핏',
    isAutomated: false,
    content: '스타트업 사람들을 위한 뉴스레터',
    thumbnailImage: 'https://www.surfit.io/assets/img/bi/symbol-mark-light-bg.png',
    subscriptionLink: 'https://surfside.stibee.com/',
    contentLink: 'https://surfside.stibee.com/',
    address: '@surfit.io',
  },
  {
    name: '점선면',
    companyName: '경향신문',
    isAutomated: false,
    content: '하나를 보더라도 입체적으로! ‘하나의 이슈’ 혹은 ‘한 편의 기사’를 천천히 곱씹어 입체적으로 바라볼 수 있도록 도와드려요',
    thumbnailImage:
      'https://app.heybunny.io/_next/image?url=https%3A%2F%2Fimages.heybunny.io%2Flarge%2F1711934366133-%ED%9D%B0%EB%B0%B0%EA%B2%BD_%EA%B3%B5%EC%9A%A9%EB%A1%9C%EA%B3%A0.png&w=3840&q=75',
    subscriptionLink: 'https://page.stibee.com/subscriptions/228606?name=%EC%9E%84%EC%B1%84%ED%98%84&email=news.jdustar122%40heybunny.io',
    contentLink: 'https://www.khan.co.kr/newsletter/cube',
    address: '@khan.co.kr',
  },
  {
    name: '당근메일',
    companyName: '당근메일',
    isAutomated: false,
    content: '일과 생활에 있어 비밀무기가 될 업무 생산성 팁을 알려줘요',
    thumbnailImage:
      'https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0a466fc4-9e99-44ce-b469-bb14a2b2cbc7%2FLogo_Copy_3.png&blockId=0a32d27b-3b47-41bd-aadd-fcb71689dc0c&width=256',
    subscriptionLink: 'https://www.carrotletter.com/',
    contentLink: 'https://www.carrotletter.com/before',
    address: '@carrotletter.com',
  },
  {
    name: '폴인',
    companyName: '폴인',
    isAutomated: false,
    content: '새로운 영감과 자극을 전달하는 폴인레터',
    thumbnailImage: 'https://www.folin.co/api/folin.jpg',
    subscriptionLink: 'https://folin-letter.stibee.com/',
    contentLink: 'https://folin-letter.stibee.com/',
    address: '@folin.co',
  },
  {
    name: '커리업',
    companyName: '한국일보',
    isAutomated: false,
    content: '나만의 커리어 궤적을 개척하는 모험, 커리업',
    thumbnailImage: 'https://careerup.hankookilbo.com/assets2/careerup-default-thumbs.jpg',
    subscriptionLink: 'https://page.stibee.com/subscriptions/163956',
    contentLink: 'https://www.hankookilbo.com/NewsLetter/careeup?curpage=1',
    address: '@hankookilbo.com',
  },
];

const startupNewsletterList: Newsletter[] = [
  {
    name: '조쉬의 프로덕트 레터',
    companyName: '조쉬의 프로덕트 레터',
    isAutomated: false,
    content: '퀄리티 있는 비즈니스, 프로덕트, 디자인, 1인 창업가 이야기를 주 1회 들려드릴게요.',
    thumbnailImage: 'https://cdn.maily.so/202309/1694438416739802.png',
    subscriptionLink: 'https://maily.so/josh',
    contentLink: 'https://maily.so/josh',
    address: '@maily.so',
  },
  {
    name: '스타트업 위클리',
    companyName: '스타트업 위클리',
    isAutomated: false,
    content: '국내외 스타트업의 다양한 소식을 한눈에 볼 수 있도록 리스트업해서 보내드려요',
    thumbnailImage:
      'https://img1.daumcdn.net/thumb/R1280x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/zIH/image/5sCKxNn2pgDIdcO7SHGa4J18opg.png',
    subscriptionLink: 'http://glance.media/subscription/subscribe',
    contentLink: 'http://glance.media/startupweekly/4zL9QSmHgsznIA8921q13MPQ/F763mgYyafQ5G5F79892QOfb5w/rxF8Bbth9njiKyBkxBaqRA',
    address: '@glance.media',
  },
  {
    name: '아웃스탠딩',
    companyName: '아웃스탠딩',
    isAutomated: false,
    content: '업무가 바빠서 주변을 둘러보기 힘들거나, 업계의 인사이트를 얻고 싶은 분들을 위해 아웃스탠딩이 하루의 이슈를 정리해 드려요',
    thumbnailImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4obITfK2yDzS4mgu5KIaAUgY0ao7xduYlA&s',
    subscriptionLink: 'https://outstanding.us1.list-manage.com/subscribe?u=58649932600b1a93ad942d0a7&id=546a6b6aba',
    contentLink: 'https://outstanding.kr/',
    address: '@outstanding.kr',
  },
  {
    name: 'EO뉴스레터',
    companyName: 'EO스튜디오',
    isAutomated: false,
    content: '창업, 커리어, 실전 팁, 스타트업씬 정보, 트렌드를 알차게 전해드려요',
    thumbnailImage: 'https://img.stibee.com/37f43248-31f4-4d8f-ab64-af1808f88cf7.jpg',
    subscriptionLink: 'https://page.stibee.com/subscriptions/174446',
    contentLink: 'https://page.stibee.com/archives/174446',
    address: '@stibee.com',
  },
  {
    name: 'PRODUCT LAB',
    companyName: 'PRODUCT LAB',
    isAutomated: false,
    content: '프로덕트를 만드는 사람들을 위한 인사이트를 보내드려요',
    thumbnailImage: 'https://cdn.maily.so/202207/1659078150169935.jpeg',
    subscriptionLink: 'https://maily.so/productlab',
    contentLink: 'https://maily.so/productlab',
    address: '@maily.so',
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
