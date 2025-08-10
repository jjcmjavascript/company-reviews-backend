import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReviewerTypeFindAllRepository } from '../repositories/reviewer-type-find-all.repository';
import {
  ReviewerType,
  ReviewerTypePrimitive,
} from '@shared/entities/reviewer-type.entity';
import { calculatePaginateOffset } from '@shared/helpers/paginate.helper';
import { ReviewerTypeDto } from '../reviewer-type.dto';

@Injectable()
export class ReviewerTypeFindAllService {
  private readonly logger = new Logger(ReviewerTypeFindAllService.name);

  constructor(
    private readonly reviewerTypeFindAllRepository: ReviewerTypeFindAllRepository,
  ) {}

  async execute(params: ReviewerTypeDto) {
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
          ...query,
        },
      };
      const result = await this.reviewerTypeFindAllRepository.execute({
        ...findAll,
        ...pagination,
      });

      return ReviewerType.fromArrayToReviewerTypeJsonResponse(
        result as ReviewerTypePrimitive[],
      );
    } catch (error) {
      this.logger.error({
        message: `Error on find all reviewer types: ${error.message}`,
        stack: error.stack,
      });
      throw new InternalServerErrorException(
        'Error on find all reviewer types',
      );
    }
  }
}
