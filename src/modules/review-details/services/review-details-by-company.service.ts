import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReviewDetailsFindAllRepository } from '../repositories/review-details-find-all.repository';
import { ReviewFindAllService } from '@modules/review/services/review-find-all.service';
import { ReviewDetailsByCompany } from '../reviews-details.interfaces';
import { ReviewDetail } from '@shared/entities/review-details.entity';

@Injectable()
export class ReviewDetailsByCompanyService {
  private readonly logger = new Logger(ReviewDetailsByCompanyService.name);
  constructor(
    private readonly reviewFindAllService: ReviewFindAllService,
    private readonly reviewDetailsFindAllRepository: ReviewDetailsFindAllRepository,
  ) {}

  async execute({ reportedCompanyId }: ReviewDetailsByCompany) {
    try {
      const reviews = await this.reviewFindAllService.execute(
        reportedCompanyId,
        {},
      );

      const reviewIds = reviews.map((review) => review.id);

      const reviewDetails = await this.reviewDetailsFindAllRepository.execute({
        reviewId: { in: reviewIds },
      });

      return ReviewDetail.fromArrayToJsonResponse(reviewDetails);
    } catch (error) {
      this.logger.error({
        message: `Error fetching reviews for company ID ${reportedCompanyId}: ${error.message}`,
        stack: error.stack,
      });
      throw new InternalServerErrorException(
        `Error fetching reviews for company ID ${reportedCompanyId}`,
      );
    }
  }
}
