import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { initDb } from './helpers/initdb';

initDb();
