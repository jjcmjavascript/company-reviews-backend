import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Password } from '@shared/entities/password.entity';
import { ReviewDetail, ReviewDetailPrimitive } from '@shared/entities/review-details.entity';

@Injectable()
export class ReviewDetailCreateRepository {
  async executeManyTransaction(
    ctx: Prisma.TransactionClient,
    reviewId: number,
    reviewDetails: Array<Partial<ReviewDetailPrimitive>>,
  ): Promise<Array<Partial<ReviewDetailPrimitive>>> {
    const result = await ctx.reviewDetail.createManyAndReturn({
      data: reviewDetails.map((reviewDetail) => ({
        reviewId: reviewId,
        score: reviewDetail.score,
        categoryId: reviewDetail.categoryId,
      })),
    });

    return ReviewDetail.fromArrayToJsonResponse(result);
  }
}
