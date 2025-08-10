import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class UserCanCreateReviewRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: number, reportedCompanyId: number) {
    const existingReview = await this.prismaService.review.findFirst({
      where: {
        userId,
        reportedCompanyId,
      },
    });

    return !existingReview;
  }
}
