import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewDetailsFindTopReturn } from '../reviews-details.interfaces';

@Injectable()
export class ReviewDetailsFindTopRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<ReviewDetailsFindTopReturn[]> {
    const result = await this.prismaService.reviewDetail.groupBy({
      by: ['reviewId'],
      _avg: {
        score: true,
      },
      orderBy: {
        _avg: {
          score: 'desc',
        },
      },
      take: 6,
    });

    return result.map((r) => ({
      reviewId: r.reviewId,
      score: r._avg.score,
    }));
  }
}
