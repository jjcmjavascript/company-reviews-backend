// like-find-all.repository.ts
import { Injectable } from '@nestjs/common';
import { ReviewReactionPrimivitive } from '@shared/entities/review-reaction.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewReactionFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: {
    reviewId: number;
  }): Promise<ReviewReactionPrimivitive[]> {
    const result = (await this.prismaService.reviewReaction.findMany({
      where: { reviewId: params.reviewId },
    })) as ReviewReactionPrimivitive[];

    return result;
  }
}
