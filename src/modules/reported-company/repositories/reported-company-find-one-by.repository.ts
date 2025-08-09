import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReportedCompanyWhere } from '../reported-company.interface';
import { ReportedCompanyPrimitive } from '@shared/entities/reported-company.entity';

@Injectable()
export class ReportedCompanyFindOneByRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    params: ReportedCompanyWhere,
  ): Promise<ReportedCompanyPrimitive> {
    const result = await this.prismaService.reportedCompany.findFirst({
      where: params,
      include: {
        companyCategoryScore: {
          select: {
            verifiedScore: true,
            unverifiedScore: true,
            categoryId: true,
          },
        },
      },
    });

    return result;
  }
}
