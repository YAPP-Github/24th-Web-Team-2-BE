// type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

// export type TMailDomain = 'NEWNICK' | 'CAREET' | 'NUGGET_LETTER';
// export type TMailDomainValue = 'newnick' | 'careet' | 'nugget-letter';

// export const MailDomainConstant: ReadonlyRecord<TMailDomain, TMailDomainValue> = {
//   NEWNICK: 'newnick',
//   CAREET: 'careet',
//   NUGGET_LETTER: 'nugget-letter',
// };

export enum MailDomainToken {
  NEWNICK = 'NEWNICK',
  CAREET = 'CAREET',
  NUGGET_LETTER = 'NUGGET_LETTER',
}
