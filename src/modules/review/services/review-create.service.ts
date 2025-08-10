import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReviewCreateDto } from '../dto/review-create.dto';
import { ReviewCreateRepository } from '../repositories/review-create.repository';
import { Review, ReviewPrimitive } from '@shared/entities/review.entity';
import { CategoryFindAllService } from '@modules/category/services/category-find-all.service';
import { ReviewerTypeFindByIdService } from '@modules/reviewer-type/services/reviewer-type-find-by-id.service';
import { ReviewerTypeCategoryFindAllService } from '@modules/reviewer-type-category/services/reviewer-type-category-find-all.service';

@Injectable()
export class ReviewCreateService {
  private readonly logger = new Logger(ReviewCreateService.name);

  constructor(
    private readonly reviewCreateRepository: ReviewCreateRepository,
    private readonly categoriesFindAllService: CategoryFindAllService,
    private readonly reviewerTypeFindByIdService: ReviewerTypeFindByIdService,
    private readonly reviewerTypeCategoryFindAllService: ReviewerTypeCategoryFindAllService,
  ) {}

  async execute(params: ReviewCreateDto): Promise<Partial<ReviewPrimitive>> {
    await this.validateCategories(params.reviewDetails, params.reviewerTypeId);
    await this.validateReviewerType(params.reviewerTypeId);

    try {
      const result = await this.reviewCreateRepository.execute(params);

      return Review.toJsonResponse(result);
    } catch (error: unknown) {
      this.logger.error({
        message: (error as Error).message,
        error: (error as Error).stack,
      });

      throw new InternalServerErrorException('Error on create review');
    }
  }

  private async validateCategories(
    reviewDetails: { categoryId: number }[],
    reviewerTypeId: number,
  ) {
    const categoryIds = reviewDetails.map((detail) => detail.categoryId);
    const categoriesInDb = await this.categoriesFindAllService.execute();
    const reviewerTypeCategories =
      await this.reviewerTypeCategoryFindAllService.execute({
        reviewerTypeId,
        categoryId: {
          in: categoryIds,
        },
      });

    console.log('reviewerTypeCategories', reviewerTypeCategories);
    const invalidCategoryIds = categoryIds.filter(
      (id) => !categoriesInDb.some((category) => category.id === id),
    );

    if (
      invalidCategoryIds.length > 0 ||
      reviewerTypeCategories.length === 0 ||
      reviewerTypeCategories.length !== categoryIds.length
    ) {
      throw new BadRequestException(`Invalid categories`);
    }
  }

  private async validateReviewerType(reviewerTypeId: number) {
    const reviewerType =
      await this.reviewerTypeFindByIdService.execute(reviewerTypeId);

    if (!reviewerType) {
      throw new BadRequestException(`Invalid reviewer type`);
    }
  }
}
