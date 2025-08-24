import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewDetailsDeleteByReviewRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(tx: Prisma.TransactionClient, reviewId: number) {
    return tx.reviewDetail.deleteMany({
      where: { reviewId },
    });
  }
}
