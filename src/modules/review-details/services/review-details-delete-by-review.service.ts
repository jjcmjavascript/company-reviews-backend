import { Injectable } from '@nestjs/common';
import { ReviewDetailsFindAllRepository } from '../repositories/review-details-find-all.repository';
import { ReviewDetailsDeleteByReviewRepository } from '../repositories/review-details-delete-by-review.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewDetailsDeleteByReviewService {
  constructor(
    private readonly reviewDetailsFindAllRepository: ReviewDetailsFindAllRepository,
    private readonly reviewDetailsDeleteByReviewRepository: ReviewDetailsDeleteByReviewRepository,
  ) {}

  async execute(tx: Prisma.TransactionClient, reviewId: number) {
    const details = await this.reviewDetailsFindAllRepository.execute({
      reviewId,
    });

    await this.reviewDetailsDeleteByReviewRepository.execute(tx, reviewId);

    return details;
  }
}
