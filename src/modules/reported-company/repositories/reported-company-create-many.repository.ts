import { Injectable } from '@nestjs/common';
import { ReportedCompanyPrimitive } from '@shared/entities/reported-company.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(createParams: Omit<ReportedCompanyPrimitive, 'id'>[]) {
    this.prismaService.$transaction(async (ctx) => {
      ctx.reportedCompany.createMany({
        data: [...createParams],
      });
    });
  }
}
