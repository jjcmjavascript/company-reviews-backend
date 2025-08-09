import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewReactionPrimivitive } from '@shared/entities/review-reaction.entity';
import { ReviewReactionFindRepository } from '../repositories/review-reaction-find.repository';
import { ReviewReactionUpdateRepository } from '../repositories/review-reaction-update.repository';
import { ReactionType } from '@shared/enums/commons.enum';
import { ReviewReactionDestroyRepository } from '../repositories/review-reaction-destroy.repository';

@Injectable()
export class ReviewReactionUpdateService {
  constructor(
    private readonly reviewReactionFindRepository: ReviewReactionFindRepository,
    private readonly reviewReactionUpdateRepository: ReviewReactionUpdateRepository,
    private readonly reviewReactionDestroyRepository: ReviewReactionDestroyRepository,
  ) {}

  async execute(params: {
    id: number;
    userId: number;
    type?: boolean;
  }): Promise<void> {
    await this.findReaction(params.id);

    if (params.type === undefined) {
      await this.reviewReactionDestroyRepository.execute({
        id: params.id,
        userId: params.userId,
      });
    } else {
      await this.reviewReactionUpdateRepository.execute({
        id: params.id,
        type: params.type ? ReactionType.LIKE : ReactionType.DISLIKE,
      });
    }
  }

  async findReaction(id: number): Promise<ReviewReactionPrimivitive> {
    try {
      const reaction = await this.reviewReactionFindRepository.execute({
        id,
      });

      if (!reaction) {
        throw new Error('Reaction not found');
      }

      return reaction;
    } catch (error) {
      throw new NotFoundException('Reaction not found');
    }
  }
}
