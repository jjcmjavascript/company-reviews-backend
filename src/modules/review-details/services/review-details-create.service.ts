import { Injectable } from '@nestjs/common';
import { ReviewDetailsCreateRepository } from '../repositories/review-details-create.repository';
import { ReviewDetailPrimitive } from '@shared/entities/review-details.entity';

@Injectable()
export class ReviewDetailsCreateService {
  constructor(
    private readonly reviewDetailsCreateRepository: ReviewDetailsCreateRepository,
  ) {}

  async execute(
    reviewId: number,
    reviewDetails: Array<Partial<ReviewDetailPrimitive>>,
  ) {
    return this.reviewDetailsCreateRepository.execute(reviewId, reviewDetails);
  }
}
