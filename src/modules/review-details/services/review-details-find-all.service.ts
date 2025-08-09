import { Injectable } from '@nestjs/common';
import { ReviewDetailsFindAll } from '../reviews-details.interfaces';

@Injectable()
export class ReviewDetailsFindAllService {
  constructor(
    private readonly reviewDetailsFindAllRepository: ReviewDetailsFindAllService,
  ) {}

  async execute({ reviewId }: ReviewDetailsFindAll) {
    return this.reviewDetailsFindAllRepository.execute({
      reviewId,
    });
  }
}
