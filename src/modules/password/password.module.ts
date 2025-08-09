import { Module } from '@nestjs/common';
import { PasswordCreateRepository } from './password-create.repository';
import { PasswordFindOneRepository } from './password-find-one.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [PasswordCreateRepository, PasswordFindOneRepository],
  exports: [PasswordCreateRepository, PasswordFindOneRepository],
})
export class PasswordModule {}
