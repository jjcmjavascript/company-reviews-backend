import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReviewerTypeCategoryFindRepository } from '../repositories/reviewer-type-category-find.repository';

@Injectable()
export class ReviewerTypeCategoryFindService {
  private readonly logger = new Logger(ReviewerTypeCategoryFindService.name);
  constructor(
    private readonly reviewerTypeCategoryFindRepository: ReviewerTypeCategoryFindRepository,
  ) {}

  async execute(params: { categoryId?: number }) {
    try {
      const find = {
        where: {
          ...params,
        },
      };
      return this.reviewerTypeCategoryFindRepository.execute(find);
    } catch (error) {
      this.logger.error({
        message: `Error on find reviewer type category: ${error.message}`,
        stack: error.stack,
      });
      throw new InternalServerErrorException(
        'Error on find reviewer type category',
      );
    }
  }
}
