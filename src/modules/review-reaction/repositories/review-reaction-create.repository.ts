import { Injectable } from '@nestjs/common';
import { ReviewReactionPrimivitive } from '@shared/entities/review-reaction.entity';
import { ReactionType } from '@shared/enums/commons.enum';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewReactionCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: {
    userId: number;
    reviewId: number;
    type: ReactionType;
  }): Promise<ReviewReactionPrimivitive> {
    const result = (await this.prismaService.reviewReaction.create({
      data: {
        userId: params.userId,
        reviewId: params.reviewId,
        type: params.type,
      },
    })) as ReviewReactionPrimivitive;

    return result;
  }
}
