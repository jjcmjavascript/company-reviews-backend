import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReviewReactionCreateRepository } from '../repositories/review-reaction-create.repository';
import { ReviewReactionFindRepository } from '../repositories/review-reaction-find.repository';
import { ReviewReactionPrimivitive } from '@shared/entities/review-reaction.entity';
import { ReactionType } from '@shared/enums/commons.enum';

@Injectable()
export class ReviewReactionCreateService {
  private readonly logger = new Logger(ReviewReactionCreateService.name);

  constructor(
    private readonly reviewReactionCreateRepository: ReviewReactionCreateRepository,
    private readonly reviewReactionFindRepository: ReviewReactionFindRepository,
  ) {}

  async execute(params: {
    userId: number;
    reviewId: number;
    type?: boolean;
  }): Promise<ReviewReactionPrimivitive> {
    const existingLike = await this.reviewReactionFindRepository.execute({
      userId: params.userId,
      reviewId: params.reviewId,
    });

    if (existingLike) {
      this.logger.warn(
        `User ${params.userId} already liked review ${params.reviewId}`,
      );

      throw new ConflictException(
        `User ${params.userId} already liked review ${params.reviewId}`,
      );
    }

    try {
      const reaction = await this.reviewReactionCreateRepository.execute({
        userId: params.userId,
        reviewId: params.reviewId,
        type: params.type ? ReactionType.LIKE : ReactionType.DISLIKE,
      });

      return reaction;
    } catch (error: unknown) {
      this.logger.error(
        `Failed to create like for user ${params.userId} on review ${params.reviewId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to create like');
    }
  }
}
