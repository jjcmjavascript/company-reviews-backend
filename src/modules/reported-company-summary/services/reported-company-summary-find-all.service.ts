import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReportedCompanySummaryFindAllRepository } from '../repositories/reported-company-summary-find-all.respository';
import {
  ReportedCompanySummaryEntity,
  ReportedCompanySummaryPrimitive,
} from '@shared/entities/reported-company-summary.entity';
import { ReportedCompanySummaryFindAll } from '../reported-company-summary.interface';

@Injectable()
export class ReportedCompanySummaryFindAllService {
  private readonly logger = new Logger(
    ReportedCompanySummaryFindAllService.name,
  );
  constructor(
    private readonly reportedCompanySummaryFindAllRepository: ReportedCompanySummaryFindAllRepository,
  ) {}

  async execute(
    where?: ReportedCompanySummaryFindAll,
  ): Promise<ReportedCompanySummaryPrimitive[]> {
    try {
      const result =
        await this.reportedCompanySummaryFindAllRepository.execute(where);

      const toJson =
        ReportedCompanySummaryEntity.fromArrayToResponseJson(result);

      return toJson;
    } catch (error) {
      this.logger.error({
        error: `Error executing find all reported company summaries: ${error.message}`,
        stack: error.stack,
        data: where,
      });
      throw new InternalServerErrorException(
        `Error executing find all reported company summaries`,
      );
    }
  }
}
