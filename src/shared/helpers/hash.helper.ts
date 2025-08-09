import * as argon2 from 'argon2';

export async function encrypt(password: string) {
  const result = await argon2.hash(password);

  return result;
}

export async function compare(password: string, hash: string) {
  const result = await argon2.verify(hash, password);

  return result;
}
