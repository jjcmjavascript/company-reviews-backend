import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ReportedCompanySummaryFindService } from './services/reported-company-summary-find.service';
import { ReportedCompanySummaryFindRepository } from './repositories/reported-company-summary-find.respository';
import { ReportedCompanySummaryController } from './reported-company-summary.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReportedCompanySummaryController],
  providers: [
    ReportedCompanySummaryFindRepository,
    ReportedCompanySummaryFindService,
  ],
  exports: [
    ReportedCompanySummaryFindRepository,
    ReportedCompanySummaryFindService,
  ],
})
export class ReportedCompanySummaryModule {}
