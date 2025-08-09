import { Module } from '@nestjs/common';

import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserRolesCreateRepository } from './repositories/user-roles-create.repository';
import { UserRolesFindOneRepository } from './repositories/user-roles-find-one.repository';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UserRolesCreateRepository, UserRolesFindOneRepository],
  exports: [UserRolesCreateRepository, UserRolesFindOneRepository],
})
export class UserRolesModule {}
