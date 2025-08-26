import { Injectable } from '@nestjs/common';
import { ReviewerTypeCategory } from '@shared/entities/reviewer-type-category.entity';
import { ReviewerTypeCategoryFindAllRepository } from '../repositories/reviewer-type-category-find-all.repository';

@Injectable()
export class ReviewerTypeCategoryFindClientAllService {
  constructor(
    private readonly reviewerTypeCategoryFindAllRepository: ReviewerTypeCategoryFindAllRepository,
  ) {}

  async execute() {
    const result = await this.reviewerTypeCategoryFindAllRepository.execute({});

    return ReviewerTypeCategory.toJsonResponseFromArray(result);
  }
}
