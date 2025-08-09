import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FindMany } from '@shared/interfaces/prisma-query.interfaces';

@Injectable()
export class ReportedCompanyFindAllPaginatedRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: FindMany) {
    return this.prismaService.reportedCompany.findMany({
      ...params,
      include: {
        companyCategoryScore: {
          select: {
            categoryId: true,
            verifiedScore: true,
            unverifiedScore: true,
          },
        },
      },
    });
  }
}
