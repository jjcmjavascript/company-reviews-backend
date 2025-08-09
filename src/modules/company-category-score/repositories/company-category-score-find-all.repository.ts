import { Injectable } from '@nestjs/common';
import { FindMany } from '@shared/interfaces/prisma-query.interfaces';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class CompanyCategoryScoreFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params: FindMany) {
    return this.prismaService.companyCategoryScore.findMany(params);
  }
}
