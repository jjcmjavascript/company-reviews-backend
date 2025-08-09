import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReviewCreateDto } from '../dto/review-create.dto';
import { ReviewCreateRepository } from '../repositories/review-create.repository';
import { Review, ReviewPrimitive } from '@shared/entities/review.entity';

@Injectable()
export class ReviewCreateService {
  private readonly logger = new Logger(ReviewCreateService.name);

  constructor(
    private readonly reviewCreateRepository: ReviewCreateRepository,
  ) { }

  async execute(params: ReviewCreateDto): Promise<Partial<ReviewPrimitive>> {
    try {
      const result = await this.reviewCreateRepository.execute(params);

      return Review.toJsonResponse(result);
    } catch (error: unknown) {
      this.logger.error({
        message: 'Error on create review',
        error: (error as Error).message,
      });

      throw new InternalServerErrorException('Error on create review');
    }
  }
}
