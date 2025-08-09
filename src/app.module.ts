import { Module } from '@nestjs/common';
import { SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';

import { config } from '@config/config';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { ReportedCompanyModule } from '@modules/reported-company/reported-company.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserRolesGuard } from './modules/user-roles/user-roles.guard';
import { UserRolesModule } from '@modules/user-roles/user-roles.module';
import { ReviewReactionModule } from '@modules/review-reaction/review-reaction.module';
import { ReviewModule } from '@modules/review/review.module';
import { ReviewDetailsModule } from '@modules/review-details/review-details.module';
import { CategoryModule } from '@modules/category/category.module';
import { ReportedCompanySummaryModule } from '@modules/reported-company-summary/reported-company-summary.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '@config/config.interface';

const providers = [];

if (process.env.SENTRY_DSN) {
  providers.push({
    provide: APP_FILTER,
    useClass: SentryGlobalFilter,
  });
}

providers.push({
  provide: 'APP_GUARD',
  useClass: AuthGuard,
});

providers.push({
  provide: 'APP_GUARD',
  useClass: UserRolesGuard,
});

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<JwtConfig>('jwt');
        return {
          secret: jwtConfig.jwtSecret,
          signOptions: {
            expiresIn: jwtConfig.jwtExpiresIn,
          },
        };
      },
    }),
    SentryModule.forRoot(),
    UserModule,
    AuthModule,
    ReportedCompanyModule,
    UserRolesModule,
    ReviewReactionModule,
    ReviewModule,
    ReviewDetailsModule,
    CategoryModule,
    ReportedCompanySummaryModule,
  ],
  controllers: [],
  providers,
})
export class AppModule {}
