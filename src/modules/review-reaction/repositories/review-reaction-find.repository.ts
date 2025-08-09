import { Injectable } from '@nestjs/common';
import { ReviewReactionPrimivitive } from '@shared/entities/review-reaction.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewReactionFindRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    params: Partial<ReviewReactionPrimivitive>,
  ): Promise<ReviewReactionPrimivitive | null> {
    if (params.id) {
      return (await this.prismaService.reviewReaction.findUnique({
        where: {
          id: params.id,
        },
      })) as ReviewReactionPrimivitive;
    }

    return (await this.prismaService.reviewReaction.findFirst({
      where: {
        userId: params.userId,
        reviewId: params.reviewId,
      },
    })) as ReviewReactionPrimivitive;
  }
}
