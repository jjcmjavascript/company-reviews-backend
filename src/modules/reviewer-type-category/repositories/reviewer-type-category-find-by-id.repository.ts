import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewerTypeCategoryFindByIdRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: number) {
    return this.prismaService.reviewerTypeCategory.findUnique({
      where: {
        id,
      },
    });
  }
}
