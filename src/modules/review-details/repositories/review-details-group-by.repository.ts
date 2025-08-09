import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewDetailsGroupByRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(reviewId: number[]) {
    return this.prismaService.reviewDetail.groupBy({
      where: {
        id: { in: reviewId },
      },
      by: ['reviewId', 'categoryId'],
    });
  }
}
