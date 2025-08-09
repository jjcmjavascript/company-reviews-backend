import * as dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config({ path: '.env.test' });

export const initDb = () => {
  try {
    console.log('creating db ✨✨');
    execSync(
      `createdb -O ${process.env.DATABASE_USER} -E UTF8 ${process.env.DATABASE_NAME}`,
      {
        stdio: 'ignore',
      },
    );
    console.log('created ✅');
  } catch (e: unknown) {
    console.log('🙅‍♂️❌ created db error:', (e as Error).message);
  }

  try {
    console.log('executing migrations 🚀🚀🚀');
    execSync('dotenv -e .env.test -- npx prisma migrate deploy');
    console.log('migrations execute ✅');
  } catch (e: unknown) {
    console.log('🙅‍♂️❌ migrations error:', (e as Error).message);
  }
};
