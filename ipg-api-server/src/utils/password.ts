import { randomFillSync, createHash } from 'crypto';

export const generatePassword = () => {
  const S =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@[]$%&-^+=~/*#!{}?.,';
  return Array.from(randomFillSync(new Uint32Array(8)))
    .map((n) => S[n % S.length])
    .join('');
};

export const hashPassword = (
  str: string,
  salt = 'E98BRP)(%B#Qpo98B09%BH(#p9%B#Q',
) => {
  const hash = createHash('md5');
  hash.update(str + salt);
  return hash.digest('hex');
};
