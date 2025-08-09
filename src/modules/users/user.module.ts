import { Module } from '@nestjs/common';
import { UserCreateRepository } from './repositories/user-create.repository';
import { UserFindAllRepository } from './repositories/user-find-all.repository';
import { UserController } from './user.controller';
import { UserFindOneRepository } from './repositories/user-find-one.repository';
import { UserRolesModule } from '@modules/user-roles/user-roles.module';
import { PasswordModule } from '@modules/password/password.module';
import { UserFindOneInternalService } from './services/user-find-one-internal.service';
import { UserFindOneService } from './services/user-find-one-public.service';

@Module({
  imports: [UserRolesModule, PasswordModule],
  controllers: [UserController],
  providers: [
    UserCreateRepository,
    UserFindAllRepository,
    UserFindOneRepository,
    UserFindOneInternalService,
    UserFindOneService,
  ],
  exports: [UserFindOneInternalService, UserCreateRepository],
})
export class UserModule {}
