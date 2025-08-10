import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ReportedCompanyFindOneByRepository } from '../repositories/reported-company-find-one-by.repository';
import {
  ReportedCompany,
  ReportedCompanyPrimitive,
} from '@shared/entities/reported-company.entity';

@Injectable()
export class ReportedCompanyFindService {
  private readonly logger = new Logger(ReportedCompanyFindService.name);

  constructor(
    private readonly repository: ReportedCompanyFindOneByRepository,
  ) {}

  async execute({ id }: { id: number }): Promise<ReportedCompanyPrimitive> {
    const reportedCompany = await this.repository.execute({
      id,
    });

    if (!reportedCompany) {
      throw new NotFoundException('Reported company not found.');
    }

    return ReportedCompany.create(reportedCompany).values;
  }
}
