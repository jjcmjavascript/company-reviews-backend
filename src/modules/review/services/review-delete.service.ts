import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtUser } from '@shared/decorators/user.decorator';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewDetailsDeleteByReviewService } from '@modules/review-details/services/review-details-delete-by-review.service';
import { CompanyCategoryScoreDecrementRepository } from '@modules/company-category-score/repositories/company-category-score-decrement.repository';

@Injectable()
export class ReviewDeleteService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reviewDetailsDeleteByReviewService: ReviewDetailsDeleteByReviewService,
    private readonly companyCategoryScoreDecrementRepository: CompanyCategoryScoreDecrementRepository,
  ) {}

  async execute(id: number, currentUser: JwtUser) {
    const review = await this.prismaService.review.findUnique({
      where: { id, userId: currentUser?.userId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== currentUser.userId) {
      throw new UnauthorizedException(
        'You are not allowed to delete this review',
      );
    }

    await this.prismaService.$transaction(async (tx) => {
      const details = await this.reviewDetailsDeleteByReviewService.execute(
        tx,
        id,
      );

      // 2. Restar los valores en company-category-score
      // TODO: cuando un status cambia es posible que la resta del valor no sea correcta, debe asegurarse que si ud estado cambia se calcule
      if (details && details.length > 0) {
        await this.companyCategoryScoreDecrementRepository.execute(tx, {
          reportedCompanyId: review.reportedCompanyId,
          details: details.map((d) => ({
            categoryId: d.categoryId,
            score: d.score,
          })),
          verificationStatus: review.verificationStatus,
        });
      }

      // 3. Eliminar el review
      await tx.review.delete({
        where: { id },
      });
    });
  }
}
