import 'dotenv/config';
import { Config } from './config.interface';

const jwtSecret = process.env.SECRET;
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3001;
const origins = process.env.ORIGINS?.split(';') || ['http://localhost:3000'];

export const config = (): Config => ({
  app: {
    port,
    isProduction,
    cookieSecret: process.env.COOKIE_SECRET,
  },
  cors: {
    origins,
    credentials: true,
  },
  jwt: {
    jwtSecret,
    jwtExpiresIn: '30m',
    jwtRefreshExpiresIn: '1h',
    accessTtlSec: 60 * 30, // 30 min
    refreshTtlSec: 60 * 60, // 1 hora
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  userLimits: {
    messageLimit: parseInt(process.env.MESSAGE_LIMIT) || 2,
    reviewLimit: parseInt(process.env.REVIEW_LIMIT) || 2,
  },
});
