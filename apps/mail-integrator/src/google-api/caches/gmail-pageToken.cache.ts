import NodeCache from 'node-cache';

const gmailPageTokenCache = new NodeCache({
  stdTTL: 55 * 60, // 55분
  checkperiod: 60, // 1분
});

export default gmailPageTokenCache;
