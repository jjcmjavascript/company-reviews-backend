import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReviewFindAllRepository } from '../repositories/review-find-all.repository';
import { Review, ReviewPrimitive } from '@shared/entities/review.entity';
import { ReviewFindDto } from '../dto/review-find.dto';
import { calculatePaginateOffset } from '@shared/helpers/paginate.helper';

@Injectable()
export class ReviewFindAllService {
  private readonly logger = new Logger(ReviewFindAllService.name);
  constructor(
    private readonly reviewFindAllRepository: ReviewFindAllRepository,
  ) {}

  async execute(reportedCompanyId: number, params: ReviewFindDto) {
    try {
      const { page, limit, ...query } = params;

      let pagination: Record<string, number> = {};

      if (page && limit) {
        pagination = {
          skip: calculatePaginateOffset(page, limit),
          take: params.limit,
        };
      }

      const findAll = {
        where: {
          reportedCompanyId,
          ...query,
        },
      };
      const result = await this.reviewFindAllRepository.execute({
        ...findAll,
        ...pagination,
      });

      return Review.fromArrayToReviewJsonResponse(result as ReviewPrimitive[]);
    } catch (error) {
      this.logger.error({
        message: `Error on find all reviews: ${error.message}`,
        stack: error.stack,
      });
      throw new InternalServerErrorException('Error on find all reviews');
    }
  }
}
