import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { CompanySearchCreateService } from './services/company-search-create.service';
import { CompanySearchFindOneRepository } from './repositories/company-search-find-one.repository';
import { CompanySearchController } from './company-search.controller';
import { CompanySearchCreateRepository } from './repositories/company-search-create.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CompanySearchController],
  providers: [
    CompanySearchCreateRepository,
    CompanySearchFindOneRepository,
    CompanySearchCreateService,
  ],
})
export class CompanySearchModule {}
