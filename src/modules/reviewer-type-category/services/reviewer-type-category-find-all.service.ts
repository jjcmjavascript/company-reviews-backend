import { Injectable } from '@nestjs/common';
import { ReviewerTypeCategory } from '@shared/entities/reviewer-type-category.entity';
import { ReviewerTypeCategoryFindAllRepository } from '../repositories/reviewer-type-category-find-all.repository';
import { NumberIn } from '@shared/interfaces/prisma-query.interfaces';

@Injectable()
export class ReviewerTypeCategoryFindAllService {
  constructor(
    private readonly reviewerTypeCategoryFindAllRepository: ReviewerTypeCategoryFindAllRepository,
  ) {}

  async execute(params: {
    categoryId: number | NumberIn;
    reviewerTypeId: number;
  }) {
    const result =
      await this.reviewerTypeCategoryFindAllRepository.execute(params);

    return ReviewerTypeCategory.toJsonResponseFromArray(result);
  }
}
