import { Module } from '@nestjs/common';
import { UserModule } from '@modules/users/user.module';
import { AuthController } from './auth.controller';
import { AuthJwtSingInRepostory } from './repositories/auth-jwt-sigin.repository';
import { UserRolesModule } from '@modules/user-roles/user-roles.module';
import { PasswordModule } from '@modules/password/password.module';
import { AuthJwtRefreshRepository } from './repositories/auth-jwt-refresh.repository';
import { AuthJwtRegisterMobileRepository } from './repositories/auth-jwt-register-mobile.repository';

@Module({
  imports: [UserRolesModule, PasswordModule, UserModule],
  providers: [
    AuthJwtSingInRepostory,
    AuthJwtRefreshRepository,
    AuthJwtRegisterMobileRepository,
  ],
  controllers: [AuthController],
  exports: [
    AuthJwtSingInRepostory,
    AuthJwtRefreshRepository,
    AuthJwtRegisterMobileRepository,
  ],
})
export class AuthModule {}
