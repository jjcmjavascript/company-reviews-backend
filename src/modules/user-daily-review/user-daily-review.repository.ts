import { Injectable } from '@nestjs/common';
import { UserDailyReviewPrimitive } from '@shared/entities/user-daily-review.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class UserDailyReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserIdForToday(
    userId: number,
  ): Promise<UserDailyReviewPrimitive[]> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.userDailyReview.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }

  async create(data: {
    userId: number;
    reviewId: number;
  }): Promise<UserDailyReviewPrimitive> {
    return this.prisma.userDailyReview.create({
      data,
    });
  }
}
