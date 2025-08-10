import { Injectable } from '@nestjs/common';
import { ReviewPrimitive } from '@shared/entities/review.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewVerificationStatus } from '@shared/enums/commons.enum';
import { ReviewDetailCreateRepository } from '@modules/review-details/repositories/review-details-create.repositoy';

@Injectable()
export class ReviewCreateRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reviewDetailCreateRepository: ReviewDetailCreateRepository,
  ) {}

  async execute(params: Partial<ReviewPrimitive>): Promise<ReviewPrimitive> {
    const result = await this.prismaService.$transaction(async (ctx) => {
      const review = await ctx.review.create({
        data: {
          userId: params.userId,
          reportedCompanyId: params.reportedCompanyId,
          reviewerTypeId: params.reviewerTypeId,
          description: params.description,
          verificationStatus: ReviewVerificationStatus.NOT_VERIFIED,
        },
      });

      const reviewDetails =
        await this.reviewDetailCreateRepository.executeManyTransaction(
          ctx,
          review.id,
          params.reviewDetails,
        );

      return { ...review, reviewDetails };
    });

    return result as ReviewPrimitive;
  }
}
