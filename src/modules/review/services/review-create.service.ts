import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ReviewCreateDto } from '../dto/review-create.dto';
import { ReviewCreateRepository } from '../repositories/review-create.repository';
import { Review, ReviewPrimitive } from '@shared/entities/review.entity';
import { CategoryFindAllService } from '@modules/category/services/category-find-all.service';
import { ReviewerTypeFindByIdService } from '@modules/reviewer-type/services/reviewer-type-find-by-id.service';
import { ReviewerTypeCategoryFindAllService } from '@modules/reviewer-type-category/services/reviewer-type-category-find-all.service';
import { ReviewFindAllRepository } from '../repositories/review-find-all.repository';
import { ReportedCompanyFindService } from '@modules/reported-company/service/reported-company-find.service';
import { JwtUser } from '@shared/decorators/user.decorator';
import { CompanyCategoryScoreCreateService } from '@modules/company-category-score/services/company-category-score-create.service';
import { ReviewVerificationStatus } from '@shared/enums/commons.enum';
import { ReviewDetailsCreateService } from '@modules/review-details/services/review-details-create.service';

@Injectable()
export class ReviewCreateService {
  constructor(
    private readonly reviewCreateRepository: ReviewCreateRepository,
    private readonly companyCategoryScoreCreateService: CompanyCategoryScoreCreateService,
    private readonly reviewDetailsCreateRepository: ReviewDetailsCreateService,
    private readonly reviewFindService: ReviewFindAllRepository,
    private readonly categoriesFindAllService: CategoryFindAllService,
    private readonly reviewerTypeFindByIdService: ReviewerTypeFindByIdService,
    private readonly reviewerTypeCategoryFindAllService: ReviewerTypeCategoryFindAllService,
    private readonly reportedCompanyFindService: ReportedCompanyFindService,
  ) {}

  async execute(
    params: ReviewCreateDto,
    currentUser: JwtUser,
  ): Promise<Partial<ReviewPrimitive>> {
    await this.validateCompany(params.reportedCompanyId);

    await this.validateReviewerType(params.reviewerTypeId);

    await this.validateCategories(params.reviewDetails, params.reviewerTypeId);

    await this.validatePreviousReview(
      currentUser.userId,
      params.reportedCompanyId,
    );

    const result = await this.reviewCreateRepository.execute({
      ...params,
      userId: currentUser.userId,
    });

    await this.companyCategoryScoreCreateService.execute({
      review: {
        reportedCompanyId: params.reportedCompanyId,
        verificationStatus: ReviewVerificationStatus.NOT_VERIFIED,
      },
      reviewDetails: params.reviewDetails,
    });

    await this.reviewDetailsCreateRepository.execute(
      result.id,
      params.reviewDetails,
    );

    return Review.toJsonResponse(result);
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

    const invalidCategoryIds = categoryIds.filter(
      (id) => !categoriesInDb.some((category) => category.id === id),
    );

    const hasInvalidCategories = invalidCategoryIds.length > 0;
    const hasNoReviewerTypeCategories = reviewerTypeCategories.length === 0;
    const hasDifferentCategoryCount =
      reviewerTypeCategories.length !== categoryIds.length;

    if (
      hasInvalidCategories ||
      hasNoReviewerTypeCategories ||
      hasDifferentCategoryCount
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

  private async validateCompany(companyId: number) {
    const company = await this.reportedCompanyFindService.execute({
      id: companyId,
    });

    if (!company) {
      throw new BadRequestException(`Invalid company`);
    }
  }

  private async validatePreviousReview(userId: number, companyId: number) {
    const previousReview = await this.reviewFindService.execute({
      where: { reportedCompanyId: companyId, userId },
    });

    if (previousReview && previousReview.length > 0) {
      throw new ConflictException(`Review already exists`);
    }
  }
}
