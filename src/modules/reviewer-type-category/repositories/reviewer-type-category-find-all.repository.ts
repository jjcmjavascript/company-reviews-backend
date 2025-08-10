import { Injectable } from '@nestjs/common';
import { Where } from '@shared/interfaces/prisma-query.interfaces';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewerTypeCategoryFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where: Where) {
    return this.prismaService.reviewerTypeCategory.findMany({
      where,
    });
  }
}
