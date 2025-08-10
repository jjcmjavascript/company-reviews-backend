export interface AppConfig {
  port: number;
  isProduction: boolean;
  cookieSecret: string;
}

export interface CorsConfig {
  origins: string[];
  credentials: boolean;
}

export interface JwtConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshExpiresIn: string;
  accessTtlSec: number;
  refreshTtlSec: number;
}

export interface SentryConfig {
  dsn: string | undefined;
}

export interface Config {
  app: AppConfig;
  cors: CorsConfig;
  jwt: JwtConfig;
  sentry: SentryConfig;
}
