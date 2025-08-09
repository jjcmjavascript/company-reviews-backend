import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  ReportedCompany,
  ReportedCompanyPrimitive,
} from '@shared/entities/reported-company.entity';
import { ReportedCompanyWhere } from '../reported-company.interface';

@Injectable()
export class ReportedCompanyFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    where?: ReportedCompanyWhere,
    limit: number = 5,
  ): Promise<ReportedCompanyPrimitive[]> {
    const result = await this.prismaService.reportedCompany.findMany({
      where: where ? { ...where, deletedAt: null } : { deletedAt: null },
      take: limit,
    });

    return ReportedCompany.fromArray(result).map((company) =>
      company.toPrimitive(),
    );
  }
}
