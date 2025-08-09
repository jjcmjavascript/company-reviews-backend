import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ReportedCompanySummaryFindAll } from '../reported-company-summary.interface';
import { ReportedCompanySummaryPrimitive } from '@shared/entities/reported-company-summary.entity';

@Injectable()
export class ReportedCompanySummaryFindRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    where?: ReportedCompanySummaryFindAll,
  ): Promise<ReportedCompanySummaryPrimitive | null> {
    return await this.prismaService.companySummary.findFirst({
      where,
    });
  }
}
