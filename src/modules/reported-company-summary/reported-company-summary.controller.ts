import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReportedCompanySummaryFindService } from './services/reported-company-summary-find.service';

@Controller('company-summaries')
export class ReportedCompanySummaryController {
  constructor(
    private readonly reportedCompanySummaryFindService: ReportedCompanySummaryFindService,
  ) {}

  @Get('company/:reportedCompanyId')
  async byCompanyId(
    @Param('reportedCompanyId', ParseIntPipe) reportedCompanyId: number,
  ): Promise<any> {
    return this.reportedCompanySummaryFindService.execute({
      reportedCompanyId,
    });
  }
}
