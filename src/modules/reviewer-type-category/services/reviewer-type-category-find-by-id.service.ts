import { Injectable } from '@nestjs/common';
import { ReviewerTypeCategory } from '@shared/entities/reviewer-type-category.entity';
import { ReviewerTypeCategoryFindByIdRepository } from '../repositories/reviewer-type-category-find-by-id.repository';

@Injectable()
export class ReviewerTypeCategoryFindByIdService {
  constructor(
    private readonly reviewerTypeCategoryFindByIdRepository: ReviewerTypeCategoryFindByIdRepository,
  ) {}

  async execute(params: number) {
    const result =
      await this.reviewerTypeCategoryFindByIdRepository.execute(params);

    if (!result) return null;

    return ReviewerTypeCategory.toJsonResponse(result);
  }
}
