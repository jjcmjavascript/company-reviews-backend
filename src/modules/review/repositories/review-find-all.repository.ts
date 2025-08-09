import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { FindMany } from '@shared/interfaces/prisma-query.interfaces';

@Injectable()
export class ReviewFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: FindMany) {
    return this.prismaService.review.findMany({
      ...params,
      include: {
        reviewDetails: {
          select: {
            categoryId: true,
            score: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
