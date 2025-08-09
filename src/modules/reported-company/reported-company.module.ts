import { Module } from '@nestjs/common';
import { ReportedCompanyFindAllRepository } from './repositories/reported-company-find-all.repository';
import { ReportedCompanyController } from './reported-company.controller';
import { ReportedCompanyCreateService } from './service/reported-company-create.service';
import { ReportedCompanyCreateRepository } from './repositories/reported-company-create.repository';
import { ReportedCompanySearchService } from './service/reported-company-search.service';
import { ReportedCompanyFindService } from './service/reported-company-find.service';
import { ReportedCompanyFindOneByRepository } from './repositories/reported-company-find-one-by.repository';
import { ReportedCompanyListService } from './service/reported-company-list.service';
import { ReportedCompanyListQuery } from '@shared/services/queries/reported-company-index/reported-company-index.query';

@Module({
  controllers: [ReportedCompanyController],
  providers: [
    ReportedCompanyListQuery,
    ReportedCompanyFindAllRepository,
    ReportedCompanyCreateRepository,
    ReportedCompanyFindOneByRepository,
    ReportedCompanyFindService,
    ReportedCompanyCreateService,
    ReportedCompanySearchService,
    ReportedCompanyListService,
  ],
  exports: [ReportedCompanyFindAllRepository],
})
export class ReportedCompanyModule {}
