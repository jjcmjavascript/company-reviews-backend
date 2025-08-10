import { Injectable, Logger } from '@nestjs/common';

import { ReviewerTypeFindByIdRepository } from '../repositories/reviewer-type-find-by-id.repository';
import { ReviewerType } from '@shared/entities/reviewer-type.entity';

@Injectable()
export class ReviewerTypeFindByIdService {
  private readonly logger = new Logger(ReviewerTypeFindByIdService.name);

  constructor(
    private readonly reviewerTypeFindByIdRepository: ReviewerTypeFindByIdRepository,
  ) {}

  async execute(id: number) {
    const reviewerType = await this.reviewerTypeFindByIdRepository.execute(id);

    if (!reviewerType) {
      return null;
    }

    return ReviewerType.toJsonResponse(reviewerType);
  }
}
