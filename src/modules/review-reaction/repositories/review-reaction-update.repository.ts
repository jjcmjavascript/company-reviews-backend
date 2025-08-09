import { Injectable } from '@nestjs/common';
import { ReviewReactionPrimivitive } from '@shared/entities/review-reaction.entity';
import { ReactionType } from '@shared/enums/commons.enum';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewReactionUpdateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: {
    id: number;
    type: ReactionType;
  }): Promise<ReviewReactionPrimivitive> {
    const result = (await this.prismaService.reviewReaction.update({
      where: {
        id: params.id,
      },
      data: {
        type: params.type,
      },
    })) as ReviewReactionPrimivitive;

    return result;
  }
}
