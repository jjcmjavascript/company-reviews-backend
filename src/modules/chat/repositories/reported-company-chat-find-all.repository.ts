import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyChatFindAllRepository {
  constructor(private readonly prisma: PrismaService) {}

  async execute(reportedCompanyId?: number, userId?: number) {
    const where: any = {};
    if (reportedCompanyId) {
      where.reportedCompanyId = reportedCompanyId;
    }

    if (userId) {
      where.userId = userId;
    }

    return this.prisma.reportedCompanyChat.findMany({
      where,
    });
  }
}
