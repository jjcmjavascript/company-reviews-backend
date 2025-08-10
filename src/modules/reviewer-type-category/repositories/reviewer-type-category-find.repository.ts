import { Injectable } from '@nestjs/common';
import { FindMany } from '@shared/interfaces/prisma-query.interfaces';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewerTypeCategoryFindRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: FindMany) {
    return this.prismaService.reviewerTypeCategory.findFirst(params);
  }
}
