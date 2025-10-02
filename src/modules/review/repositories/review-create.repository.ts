import { ForbiddenException, Injectable } from '@nestjs/common';
import { ReviewPrimitive } from '@shared/entities/review.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewVerificationStatus } from '@shared/enums/commons.enum';
import { ReviewDetailCreateRepository } from '@modules/review-details/repositories/review-details-create.repositoy';
import { ConfigService } from '@nestjs/config';
import { UserLimits } from '@config/config.interface';

@Injectable()
export class ReviewCreateRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reviewDetailCreateRepository: ReviewDetailCreateRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(params: Partial<ReviewPrimitive>): Promise<ReviewPrimitive> {
    await this.checkUserReviewLimit(params.userId);

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

  private async checkUserReviewLimit(userId: number) {
    const userLimits: UserLimits =
      this.configService.get<UserLimits>('userLimits');

    const reviewsCreatedToday = await this.prismaService.review.count({
      where: {
        userId: userId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    if (reviewsCreatedToday >= userLimits.reviewLimit) {
      throw new ForbiddenException(
        'User has reached the maximum number of reviews allowed for today.',
      );
    }
  }
}
