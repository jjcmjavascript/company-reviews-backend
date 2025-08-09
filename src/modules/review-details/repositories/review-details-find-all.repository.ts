import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewDetailsFindAll } from '../reviews-details.interfaces';

@Injectable()
export class ReviewDetailsFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async execute({ reviewId }: ReviewDetailsFindAll) {
    return this.prismaService.reviewDetail.findMany({
      where: {
        reviewId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
