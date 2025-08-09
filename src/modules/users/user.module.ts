import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserCreateRepository } from './repositories/user-create.repository';
import { UserFindAllRepository } from './repositories/user-find-all.repository';
import { UserController } from './user.controller';
import { UserFindOneRepository } from './repositories/user-find-one.repository';
import { UserRolesModule } from '@modules/user-roles/user-roles.module';
import { PasswordModule } from '@modules/password/password.module';

@Module({
  imports: [PrismaModule, UserRolesModule, PasswordModule],
  controllers: [UserController],
  providers: [
    UserCreateRepository,
    UserFindAllRepository,
    UserFindOneRepository,
  ],
  exports: [UserCreateRepository, UserFindOneRepository],
})
export class UserModule {}
