type UnitAnyCase = 'ms' | 's' | 'm' | 'h' | 'd' | 'w';
type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

export interface Config {
  app: AppConfig;
  cors: CorsConfig;
  jwt: JwtConfig;
  sentry: SentryConfig;
  userLimits: UserLimits;
}

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
  jwtExpiresIn: StringValue | number;
  jwtRefreshExpiresIn: StringValue | number;
  accessTtlSec: number;
  refreshTtlSec: number;
}

export interface SentryConfig {
  dsn: string | undefined;
}

export interface UserLimits {
  messageLimit: number;
  reviewLimit: number;
}
