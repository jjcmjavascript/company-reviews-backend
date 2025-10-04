import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewTodayCountByUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: number) {
    return await this.prismaService.review.count({
      where: {
        userId: userId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });
  }
}
