import { Injectable } from '@nestjs/common';
import { CompanySearchPrimitive } from '@shared/entities/company-search.entity';
import { getEndOfDay, getStartOfDay } from '@shared/helpers/date.helper';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class CompanySearchFindOneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(body: Partial<CompanySearchPrimitive>) {
    return this.prismaService.companySearch.findFirst({
      where: {
        ...body,
        createdAt: {
          gte: getStartOfDay(),
          lt: getEndOfDay(),
        },
      },
    });
  }
}
