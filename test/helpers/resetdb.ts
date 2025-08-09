import * as dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config({ path: '.env.test' });

export const resetDb = () => {
  try {
    execSync(`dropdb ${process.env.DATABASE_NAME}`);
  } catch (e: unknown) {
    console.info('🙅‍♂️❌ deleting db:', (e as Error).message);
  }
};
