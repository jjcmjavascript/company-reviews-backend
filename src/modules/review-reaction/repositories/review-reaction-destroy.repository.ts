import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewReactionDestroyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: { id?: number; userId: number }): Promise<void> {
    await this.prismaService.reviewReaction.delete({
      where: {
        id: params.id,
        userId: params.userId,
      },
    });
  }
}
