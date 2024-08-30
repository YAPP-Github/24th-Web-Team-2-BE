export interface SimpleNewsletter {
  name: string;
  address: string;
  isAutomated: boolean;
  thumbnailImage: string;
}

export const subscriptionSimpleNewsletterList: SimpleNewsletter[] = [
  {
    name: 'Naver FE News',
    address: '@substack.com',
    isAutomated: false,
    thumbnailImage:
      'https://substackcdn.com/image/fetch/w_170,c_limit,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a361db4-9ede-4d1a-baf0-c7357acd4e4c_479x479.png',
  },
  {
    name: '요즘 IT',
    address: '@wishket.com',
    isAutomated: false,
    thumbnailImage: 'https://yozm.wishket.com/static/renewal/img/news/og-img-main.png',
  },
  {
    name: '뭐지 뉴스레터',
    address: '@moji.or.kr',
    isAutomated: false,
    thumbnailImage: 'https://moji.or.kr/new_logo_text.svg',
  },
  {
    name: 'GeekNews',
    address: '@hada.io',
    isAutomated: false,
    thumbnailImage:
      'https://app.heybunny.io/_next/image?url=https%3A%2F%2Fassets.heybunny.io%2Fnewsletter%2Fweb%2Fgeeknews.png&w=3840&q=75',
  },
  {
    name: '팁스터',
    address: '@maily.so',
    isAutomated: false,
    thumbnailImage: 'https://cdn.maily.so/mailydfd3985cf89c8dd5ed873917477ed7c61627967836',
  },
  {
    name: '일분톡',
    address: '@ilbuntok.com',
    isAutomated: false,
    thumbnailImage: 'https://t1.daumcdn.net/news/202311/06/ilbuntok/20231106110238888fodm.png',
  },
  {
    name: '죠스레터',
    address: '@jawsletter.blog',
    isAutomated: false,
    thumbnailImage: 'https://www.jawsletter.blog/content/images/size/w256h256/2024/03/character2.png',
  },
  {
    name: '어피티',
    address: '@uppity.co.kr',
    isAutomated: false,
    thumbnailImage:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAACUCAMAAABBVf7OAAAAbFBMVEX/IiL/////AAD/qan/0dH/9vb/bm7/Hh7/YWH/4uL/enr/Cwv/LCz/3Nz/ZGT//Pz/ior/R0f/GBj/w8P/7+//PDz/nZ3/k5P/y8v/XFz/hob/1tb/QkL/NDT/WFj/uLj/UVH/r6//gID/o6P43nXFAAAECElEQVR4nO3c23KqMBSAYViCgOEgIRwUELHv/44bULuT4ITOnu6xK13/RVudXvgNB0MMOg5FURRFURRFURRFURRFURRF/c84bPTuF/hd8W5n7mgLFUbXnMj5u1/j9wTehtQP2btf4/cEDUlJijWS2i1NEnH/I2qF3dLLtVp+i30+2C29Qblsy4qD5dtUgPMx206wt+A4ZfoAvpXOPnsIfdcdYojwS/m19ZSiTJJG0A9udoCTBedeeWuty1I4uEWpbGe00sQkdRMom3rZhW2X+ilcrupgwlKpWwCHk5CfsVUanRiM8knKWmk2Qq7+i63SafdN1dOzBdKorj4rrJaOwDkPnGD6CTerpQX0fe9wZ/oZ1xZIAzX9OK2nQZEVx2kQxGqBr8Jq2CvvKW4THDBKg+CYqGnQtdT19ccopLxsXXNrqR5Jf1YkJelLafpbpFmJ4VPFf5G2R6Uaxc6rSofnk1fPII0u2twhCqgmZU48DenjIG9M0hMOmpYiFU3hlXDwCs+3QMqZEpTagD6HauM4RSLlXapWa+PclbSpB4xSXo6RmlBda+kqHFIWGmforZJuzYeRlKQ/NZKapJmv1nQYBvSK1E/aqUT5JHgtzXYHtRzDJlWlXrwM0C+jb5J6nTagx7BFdWnJLqdTCVA9qCKJRAfHaTwh2T2ca1o1KSRJ4p2Zc79Iy8ZLmDqsTMNwwCfVF6KcIkU6/4pS+FgO1awCxnjAGbARnRQu2ulEHq1P0vlRVsPZf+y9zwQ2Kb8m2luEfJ79Kz3qE/fyf6GQsr1+qaIY7ntv28FgmBOzRDoURe1AZ7rAsUMaLBNevXEBrx3S+f00PJsHiHZIQfhiY9oapTSbU6UvZEKbfqn64N2ML6RIk9sy4z74knS9QcUhVGbUwh7DJlWlw32UFH8+91LqgTpNyjBsUU1aQFx9VCl8Lrd+KW1QXJOt0qTdfKDWwXMFb9MjluoDel06H4gX2N2fiPb5CopFyva1+omfPPh5SN3QOFOEQ8pebKOVNMqNN5TikMq3dryUCiGim3yri63SeJ7vAvM0px3SZUCfV8bxnx3SfjeOg2ce6Noh7bZG8yil/vO2ySTJTFKhLZDco5Me2WOVdVAWBmmiL3rlKMa5svT8XIAMgUk6nabU3m34Wq+ljln67hf9T21Jr79EKsZiBbVT+jKS/vBISlKS/vx+p7R+PPAhlhZgZ5H6DQYejnnrVbJ0GhEtwh3069ltbAtRVilXbTGERdvuGJylTbrDubOuUq7Ehx5gnv5Nhe3SrDhfujyt5ClfO6XzajnPUz/Xt1W6jqToIilJ8bYtHS2RsuuG1K8skTpQmb9TuEJxT+yX2vqeaGugFEVRFEVRFEVRFEVRFEVR1Pv7Az9ZWog4v77uAAAAAElFTkSuQmCC',
  },
  {
    name: '뉴닉 데일리',
    address: '@stibee.com',
    isAutomated: false,
    thumbnailImage:
      'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/cnB6/image/IhsF3EupicqXfXqXn4YmNPBgeIk.png',
  },
  {
    name: '부딩',
    address: '@booding.co',
    isAutomated: false,
    thumbnailImage:
      'https://static.wixstatic.com/media/6cb3fa_7a010a4bed4847cf942d1fadeeb58cda~mv2.jpg/v1/fill/w_640,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6cb3fa_7a010a4bed4847cf942d1fadeeb58cda~mv2.jpg',
  },
  {
    name: '미스터동',
    address: '@mrdongnews.com',
    isAutomated: false,
    thumbnailImage:
      'https://static.wixstatic.com/media/6cb3fa_7a010a4bed4847cf942d1fadeeb58cda~mv2.jpg/v1/fill/w_640,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6cb3fa_7a010a4bed4847cf942d1fadeeb58cda~mv2.jpg',
  },
  {
    name: '순살브리핑',
    address: '@soonsal.com',
    isAutomated: false,
    thumbnailImage: 'https://yt3.googleusercontent.com/ytc/AIdro_lMar43mGyvDkwpYrlBmk9iqVrKDX1uKxwWCzB1IHyew2k=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: '디그',
    address: '@stibee.com',
    isAutomated: false,
    thumbnailImage: 'https://s3.ap-northeast-2.amazonaws.com/img.stibee.com/a82ab710-ca85-4f2e-bda8-3c7abcbad46a.png',
  },
  {
    name: '너겟레터',
    address: '@nugget.im',
    isAutomated: false,
    thumbnailImage: 'https://img.stibee.com/b49d7b21-1aad-4e17-ba8d-05fe317d162f.jpg',
  },
  {
    name: '커피팟',
    address: '@coffeepot.me',
    isAutomated: false,
    thumbnailImage: 'https://cdn.imweb.me/upload/S20191122814e60292f7a5/71c918a03846e.png',
  },
  {
    name: '디자인 나침반 뉴스레터',
    address: '@designcompass.org',
    isAutomated: false,
    thumbnailImage: '',
  },
  {
    name: 'MSV 임팩트레터',
    address: '@magazinemsv.com',
    isAutomated: false,
    thumbnailImage: 'https://cdn.imweb.me/thumbnail/20230327/142a114118c84.png',
  },
  {
    name: '텔유어월드',
    address: '@stibee.com',
    isAutomated: false,
    thumbnailImage: 'https://img.stibee.com/ce6709c2-26cd-4388-bcfc-80fa1c267b4a.jpg',
  },
  {
    name: '아트레터',
    address: '@artlamp.org',
    isAutomated: false,
    thumbnailImage: 'https://cdn.imweb.me/thumbnail/20240825/9a391319747ef.png',
  },
  {
    name: 'from.designer',
    address: '@maily.so',
    isAutomated: false,
    thumbnailImage: 'https://cdn.maily.so/maily96b1a25984762d02e6b644e5b3ebf3321617349721',
  },
  {
    name: '캐릿',
    address: '@careet.net',
    isAutomated: false,
    thumbnailImage: 'https://img.stibee.com/66918_1676014333.png',
  },
  {
    name: '은하맨숀',
    address: '@maily.so',
    isAutomated: false,
    thumbnailImage: 'https://cdn.maily.so/202405/1714788595415344.png',
  },
  {
    name: '미라클레터',
    address: '@mk.co.kr',
    isAutomated: false,
    thumbnailImage: 'https://wimg.mk.co.kr/svc/newsletter/product/202311/02/a5f311db-0b6a-41ef-805c-71582823396f.jpg',
  },
  {
    name: '어거스트',
    address: '@stibee.com',
    isAutomated: false,
    thumbnailImage: 'https://s3.ap-northeast-2.amazonaws.com/img.stibee.com/ec66e8cd-0ed0-4e1a-b60e-80697b8e03b3.png',
  },
  {
    name: '트렌드 라이트',
    address: '@stibee.com',
    isAutomated: false,
    thumbnailImage:
      'https://media.licdn.com/dms/image/D4E16AQF2_AtqtMnD9w/profile-displaybackgroundimage-shrink_200_800/0/1665629374336?e=2147483647&v=beta&t=5hTYVGo_0eUx_VFGlPSbwlauLyw-DfoFyg-5J-t-lg8',
  },
  {
    name: '서핏',
    address: '@surfit.io',
    isAutomated: false,
    thumbnailImage: 'https://www.surfit.io/assets/img/bi/symbol-mark-light-bg.png',
  },
  {
    name: '점선면',
    address: '@khan.co.kr',
    isAutomated: false,
    thumbnailImage:
      'https://app.heybunny.io/_next/image?url=https%3A%2F%2Fimages.heybunny.io%2Flarge%2F1711934366133-%ED%9D%B0%EB%B0%B0%EA%B2%BD_%EA%B3%B5%EC%9A%A9%EB%A1%9C%EA%B3%A0.png&w=3840&q=75',
  },
  {
    name: '당근메일',
    address: '@carrotletter.com',
    isAutomated: false,
    thumbnailImage:
      'https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0a466fc4-9e99-44ce-b469-bb14a2b2cbc7%2FLogo_Copy_3.png&blockId=0a32d27b-3b47-41bd-aadd-fcb71689dc0c&width=256',
  },
  {
    name: '폴인',
    address: '@folin.co',
    isAutomated: false,
    thumbnailImage: 'https://www.folin.co/api/folin.jpg',
  },
  {
    name: '커리업',
    address: '@hankookilbo.com',
    isAutomated: false,
    thumbnailImage: 'https://careerup.hankookilbo.com/assets2/careerup-default-thumbs.jpg',
  },
  {
    name: '조쉬의 프로덕트 레터',
    address: '@maily.so',
    isAutomated: false,
    thumbnailImage: '',
  },
  {
    name: '스타트업 위클리',
    address: '@glance.media',
    isAutomated: false,
    thumbnailImage:
      'https://img1.daumcdn.net/thumb/R1280x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/zIH/image/5sCKxNn2pgDIdcO7SHGa4J18opg.png',
  },
  {
    name: '아웃스탠딩',
    address: '@outstanding.kr',
    isAutomated: false,
    thumbnailImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4obITfK2yDzS4mgu5KIaAUgY0ao7xduYlA&s',
  },
  {
    name: 'EO뉴스레터',
    address: '@stibee.com',
    isAutomated: false,
    thumbnailImage: 'https://img.stibee.com/37f43248-31f4-4d8f-ab64-af1808f88cf7.jpg',
  },
  {
    name: 'PRODUCT LAB',
    address: '@maily.so',
    isAutomated: false,
    thumbnailImage: 'https://cdn.maily.so/202207/1659078150169935.jpeg',
  },
];
