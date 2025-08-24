import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewDetailPrimitive } from '@shared/entities/review-details.entity';

@Injectable()
export class ReviewDetailsCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    reviewId: number,
    reviewDetails: Array<Partial<ReviewDetailPrimitive>>,
  ) {
    return this.prismaService.reviewDetail.createMany({
      data: reviewDetails.map((detail) => ({
        reviewId,
        categoryId: detail.categoryId,
        score: detail.score,
      })),
    });
  }
}
