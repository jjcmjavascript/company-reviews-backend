import { Injectable } from '@nestjs/common';
import { CompanySearchPrimitive } from '@shared/entities/company-search.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class CompanySearchCreateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: Omit<CompanySearchPrimitive, 'id' | 'createdAt'>) {
    return this.prisma.companySearch.create({
      data,
    });
  }
}
