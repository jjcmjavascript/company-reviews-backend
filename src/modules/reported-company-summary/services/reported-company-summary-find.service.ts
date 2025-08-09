import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ReportedCompanySummaryPrimitive } from '@shared/entities/reported-company-summary.entity';
import { ReportedCompanySummaryFindAll } from '../reported-company-summary.interface';
import { ReportedCompanySummaryFindRepository } from '../repositories/reported-company-summary-find.respository';

@Injectable()
export class ReportedCompanySummaryFindService {
  private readonly logger = new Logger(ReportedCompanySummaryFindService.name);
  constructor(
    private readonly reportedCompanySummaryFindRepository: ReportedCompanySummaryFindRepository,
  ) {}

  async execute(
    where?: ReportedCompanySummaryFindAll,
  ): Promise<ReportedCompanySummaryPrimitive | null> {
    let result: ReportedCompanySummaryPrimitive | null = null;
    try {
      result = await this.reportedCompanySummaryFindRepository.execute(where);
    } catch (error) {
      this.logger.error({
        error: `Error executing find company summary: ${error.message}`,
        stack: error.stack,
        data: where,
      });
      throw new InternalServerErrorException(
        `Error executing find company summary`,
      );
    }

    if (!result) {
      throw new NotFoundException(`Company summary not found`);
    }

    return result;
  }
}
