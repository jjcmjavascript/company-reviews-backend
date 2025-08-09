import { Injectable } from '@nestjs/common';
import { ReportedCompanyPrimitive } from '@shared/entities/reported-company.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    createParams: Partial<ReportedCompanyPrimitive>,
  ): Promise<ReportedCompanyPrimitive> {
    return this.prismaService.$transaction(async (ctx) => {
      return ctx.reportedCompany.create({
        data: {
          name: createParams.name,
          description: createParams.description,
          imageUrl: createParams.imageUrl,
        },
      });
    });
  }
}
